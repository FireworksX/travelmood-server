import DB from '@databases';
import { AcceptRequestDto, CreateRequestDto } from '@dtos/requests.dto';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Request } from '@interfaces/requests.interface';
import WSSService from '@services/wss.service';
import { Op } from 'sequelize';
import UserService from '@services/users.service';
import { City } from '@interfaces/cities.interface';
import CitiesService from '@services/cities.service';

class RequestsService {
  public requests = DB.Requests;
  public users = DB.Users;
  public usersService = new UserService();
  public citiesService = new CitiesService();
  public wssService = new WSSService();

  public async findAllRequests(): Promise<Request[]> {
    const allRequest: Request[] = await this.requests.findAll();
    return allRequest;
  }

  public async findRequestById(requestId: number): Promise<Request> {
    if (isEmpty(requestId)) throw new HttpException(400, "You're not requestId");

    const findRequest: Request = await this.requests.findByPk(requestId);
    if (!findRequest) throw new HttpException(409, "You're not user");

    return findRequest;
  }

  public async acceptRequest(requestData: AcceptRequestDto): Promise<Request> {
    if (isEmpty(requestData)) throw new HttpException(400, "You're not request");

    const { request_id, guide_id } = requestData;
    const findRequest: Request = await this.requests.findByPk(request_id, { raw: true });
    if (!findRequest) throw new HttpException(409, "You're not request");

    const formatData: CreateRequestDto = {
      ...findRequest,
      accept_guides: [...findRequest.accept_guides, guide_id],
    };

    await this.requests.update(formatData, { where: { id: request_id } });
    const updateRequest: Request = await this.requests.findByPk(request_id, { raw: true });
    const fullGuides = await Promise.all(updateRequest.accept_guides.map(id => this.usersService.findUserById(id)));

    this.wssService.broadcast('acceptRequest', {
      ...updateRequest,
      accept_guides: fullGuides,
    });

    return updateRequest;
  }

  public async createRequest(requestData: CreateRequestDto): Promise<Request> {
    if (isEmpty(requestData)) throw new HttpException(400, "You're not request");

    const createRequestData: Request = (await this.requests.create(requestData)).get({ plain: true });
    const findCity: City = await this.citiesService.findCityByName(requestData.city);
    const guides = await this.users.findAll({ where: { role: { [Op.contains]: ['guide'] }, cities: { [Op.contains]: [findCity.id] } }, raw: true });
    const guidesWithContacts = await Promise.all(guides.map(guide => this.usersService.mergeUser(guide)));

    this.wssService.broadcast('createRequest', {
      ...createRequestData,
      guides: guidesWithContacts,
    });

    return createRequestData;
  }

  public async updateRequest(requestId: number, requestData: CreateRequestDto): Promise<Request> {
    if (isEmpty(requestData)) throw new HttpException(400, "You're not requestData");

    const findRequest: Request = await this.requests.findByPk(requestId);
    if (!findRequest) throw new HttpException(409, "You're not request");

    await this.requests.update(requestData, { where: { id: requestId } });

    const updateRequest: Request = await this.requests.findByPk(requestId);
    return updateRequest;
  }

  public async deleteRequest(requestId: number): Promise<Request> {
    if (isEmpty(requestId)) throw new HttpException(400, "You're not requestId");

    const findRequest: Request = await this.requests.findByPk(requestId);
    if (!findRequest) throw new HttpException(409, "You're not request");

    await this.requests.destroy({ where: { id: requestId } });

    return findRequest;
  }
}

export default RequestsService;
