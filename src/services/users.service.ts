import bcrypt from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { User, UserExtend, UserRole } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import ContactsService from '@services/contacts.service';
import { hasNewValue } from '@utils/hasNewValue';
import { uniqueArray } from '@utils/uniqueArray';
import CitiesService from '@services/cities.service';
import { Op } from 'sequelize';

const contactsService = new ContactsService();
const citiesService = new CitiesService();

class UserService {
  public users = DB.Users;

  public async mergeUser(userData: User): Promise<UserExtend> {
    const contacts = await Promise.all((userData.contacts || []).map(id => contactsService.findContactById(id)));
    const cities = await Promise.all((userData.cities || []).map(id => citiesService.findCityById(id)));

    return {
      ...userData,
      contacts,
      cities,
    };
  }

  public async findAllUser(where?: any): Promise<UserExtend[]> {
    const users = await this.users.findAll({ where, raw: true });
    return await Promise.all(users.map(this.mergeUser));
  }

  public async findUserById(userId: number): Promise<UserExtend> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findByPk(userId, { raw: true });
    if (!findUser) throw new HttpException(409, "You're not user");

    return this.mergeUser(findUser);
  }

  public async addContact(userId: number, contactId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findByPk(userId, { raw: true });
    if (!findUser) throw new HttpException(409, "You're not user");

    findUser.contacts = [...(findUser.contacts || []), contactId];
    await this.users.update(findUser, { where: { id: userId } });

    return await this.users.findByPk(userId, { raw: true });
  }

  public async addCity(userId: number, cityId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findByPk(userId, { raw: true });
    if (!findUser) throw new HttpException(409, "You're not user");

    if ((findUser.cities && !findUser.cities.includes(cityId)) || findUser.cities === null) {
      findUser.cities = [...(findUser.cities || []), cityId];
      await this.users.update(findUser, { where: { id: userId } });

      return await this.users.findByPk(userId, { raw: true });
    }
    return findUser;
  }

  public async removeCity(userId: number, cityId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findByPk(userId, { raw: true });
    if (!findUser) throw new HttpException(409, "You're not user");

    if (findUser.cities && findUser.cities.includes(cityId)) {
      findUser.cities = findUser.cities.filter(id => id !== cityId);
      await this.users.update(findUser, { where: { id: userId } });

      return await this.users.findByPk(userId, { raw: true });
    }
    return findUser;
  }

  public async setRoles(userId: number, roles: UserRole[]): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findByPk(userId, { raw: true });
    if (!findUser) throw new HttpException(409, "You're not user");

    findUser.role = roles;
    await this.users.update(findUser, { where: { id: userId } });

    return await this.users.findByPk(userId, { raw: true });
  }

  public async getUserByUserName(username: string): Promise<User> {
    if (isEmpty(username)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ where: { username: username } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    let findUser: any = await this.users.findOne({ where: { username: userData.username } });
    if (findUser) {
      findUser = findUser.get({ plain: true });
    }

    if (findUser) {
      const newContacts = await contactsService.createContactList(userData.contacts);
      if (newContacts.length > 0) {
        await Promise.all(newContacts.map(contact => this.addContact(findUser.id, contact.id)));
      }

      if (hasNewValue(findUser.role, userData.role)) {
        const uniqueRoles = uniqueArray(findUser.role, userData.role);
        await this.setRoles(findUser.id, uniqueRoles);
      }

      throw new HttpException(409, `You're username ${userData.username} already exists`);
    }

    const newContacts = await contactsService.createContactList(userData.contacts);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.users.create({ ...userData, password: hashedPassword, contacts: newContacts.map(({ id }) => id), cities: [] });
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const contacts = findUser.contacts;
    const newContacts = await contactsService.createContactList(userData.contacts);

    if (newContacts.length > 0) {
      await Promise.all(newContacts.map(contact => this.addContact(findUser.id, contact.id)));
    }
    await this.users.update(
      {
        ...userData,
        contacts,
      },
      { where: { id: userId } },
    );

    return await this.users.findByPk(userId);
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
