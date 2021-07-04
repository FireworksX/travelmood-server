import DB from '@databases';
import { CreateContactDto } from '@dtos/contacts.dto';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ContactCell } from '@interfaces/contacts.interface';

class ContactsService {
  public contacts = DB.Contacts;

  public async findContactById(requestId: number): Promise<ContactCell> {
    if (isEmpty(requestId)) throw new HttpException(400, "You're not requestId");

    const findContact: ContactCell = await this.contacts.findByPk(requestId);
    if (!findContact) throw new HttpException(409, "You're not user");

    return findContact;
  }

  public async findContactByListId(requestId: number[]): Promise<ContactCell[]> {
    if (isEmpty(requestId)) throw new HttpException(400, "You're not requestId");

    const findContacts: ContactCell[] = await Promise.all(requestId.map(id => this.contacts.findByPk(id, { raw: true })));
    if (!findContacts) throw new HttpException(409, "You're not user");

    return findContacts;
  }

  public async findContactByValue(contactValue: string): Promise<ContactCell> {
    if (isEmpty(contactValue)) throw new HttpException(400, "You're not contact");

    const findContact: ContactCell = (await this.contacts.findOne({ where: { value: contactValue } })).get({ plain: true });
    if (!findContact) throw new HttpException(409, "You're not user");

    return findContact;
  }

  public async createContactList(contacts: CreateContactDto[]): Promise<ContactCell[]> {
    if (isEmpty(contacts)) throw new HttpException(400, "You're not contact");

    const fn = async (contact: CreateContactDto) => {
      const findContacts: ContactCell[] = await this.contacts.findAll({ where: { value: contact.value }, raw: true });
      const hasSameType = findContacts.find(({ type }) => contact.type === type);

      if (findContacts.length === 0 || !hasSameType) {
        return await this.createContact(contact);
      }
      return undefined;
    };

    const list: ContactCell[] = (await Promise.all(contacts.map(fn))).filter(Boolean);
    return list;
  }

  public async createContact(requestData: CreateContactDto): Promise<ContactCell> {
    if (isEmpty(requestData)) throw new HttpException(400, "You're not request");

    const createContactData: ContactCell = (await this.contacts.create(requestData)).get({ plain: true });
    return createContactData;
  }

  public async updateContact(requestId: number, requestData: CreateContactDto): Promise<ContactCell> {
    if (isEmpty(requestData)) throw new HttpException(400, "You're not requestData");

    const findContact: ContactCell = await this.contacts.findByPk(requestId);
    if (!findContact) throw new HttpException(409, "You're not request");

    await this.contacts.update(requestData, { where: { id: requestId } });

    const updateContact: ContactCell = await this.contacts.findByPk(requestId);
    return updateContact;
  }

  public async deleteContact(requestId: number): Promise<ContactCell> {
    if (isEmpty(requestId)) throw new HttpException(400, "You're not contacts");

    const findContact: ContactCell = await this.contacts.findByPk(requestId);
    if (!findContact) throw new HttpException(409, "You're not contacts");

    await this.contacts.destroy({ where: { id: requestId } });

    return findContact;
  }
}

export default ContactsService;
