import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import CitiesController from '@controllers/cities.controller';
import { CreateCityDto } from '@dtos/cities.dto';

class CitiesRoute implements Route {
  public path = '/cities';
  public router = Router();
  public citiesController = new CitiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.citiesController.getCities);
    this.router.get(`${this.path}/:id(\\d+)`, this.citiesController.getCityById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCityDto, 'body'), this.citiesController.createCity);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateCityDto, 'body', true), this.citiesController.updateCity);
    this.router.delete(`${this.path}/:id(\\d+)`, this.citiesController.deleteCity);
  }
}

export default CitiesRoute;
