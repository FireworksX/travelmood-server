import { NextFunction, Response, Request as InputRequest } from 'express';
import CitiesService from '@services/cities.service';
import { City } from '@interfaces/cities.interface';
import { CreateCityDto } from '@dtos/cities.dto';

class CitiesController {
  public citiesService = new CitiesService();

  public getCities = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const findAllCitiesData: City[] = await this.citiesService.findAllCities();

      res.status(200).json({ data: findAllCitiesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCityById = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const findOneCityData: City = await this.citiesService.findCityById(userId);

      res.status(200).json({ data: findOneCityData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCity = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const citiesData: CreateCityDto = req.body;
      const createCityData: City = await this.citiesService.createCity(citiesData);

      res.status(201).json({ data: createCityData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCity = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const citiesId = Number(req.params.id);
      const citiesData: CreateCityDto = req.body;
      const updateCityData: City = await this.citiesService.updateCity(citiesId, citiesData);

      res.status(200).json({ data: updateCityData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCity = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteCityData: City = await this.citiesService.deleteCity(userId);

      res.status(200).json({ data: deleteCityData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CitiesController;
