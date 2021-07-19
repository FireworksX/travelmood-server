import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { City } from '@interfaces/cities.interface';
import { CreateCityDto } from '@dtos/cities.dto';

class CitiesService {
  public cities = DB.Cities;

  public async findAllCities(): Promise<City[]> {
    const allRequest: City[] = await this.cities.findAll();
    return allRequest;
  }

  public async findCityByName(cityName: string): Promise<City> {
    if (isEmpty(cityName)) throw new HttpException(400, "You're not cityIdId");

    const findRequest: City = await this.cities.findOne({ where: { name: cityName }, raw: true });
    if (!findRequest) throw new HttpException(409, "You're not city");

    return findRequest;
  }

  public async findCityById(cityId: number): Promise<City> {
    if (isEmpty(cityId)) throw new HttpException(400, "You're not cityIdId");

    const findRequest: City = await this.cities.findByPk(cityId);
    if (!findRequest) throw new HttpException(409, "You're not city");

    return findRequest;
  }

  public async createCity(requestData: CreateCityDto): Promise<City> {
    if (isEmpty(requestData)) throw new HttpException(400, "You're not city");

    const createRequestData: City = (await this.cities.create(requestData)).get({ plain: true });
    return createRequestData;
  }

  public async updateCity(requestId: number, requestData: CreateCityDto): Promise<City> {
    if (isEmpty(requestData)) throw new HttpException(400, "You're not requestData");

    const findRequest: City = await this.cities.findByPk(requestId);
    if (!findRequest) throw new HttpException(409, "You're not city");

    await this.cities.update(requestData, { where: { id: requestId } });

    const updateRequest: City = await this.cities.findByPk(requestId);
    return updateRequest;
  }

  public async deleteCity(cityId: number): Promise<City> {
    if (isEmpty(cityId)) throw new HttpException(400, "You're not city");

    const findRequest: City = await this.cities.findByPk(cityId);
    if (!findRequest) throw new HttpException(409, "You're not request");

    await this.cities.destroy({ where: { id: cityId } });

    return findRequest;
  }
}

export default CitiesService;
