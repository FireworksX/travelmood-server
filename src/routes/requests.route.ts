import { Router } from 'express';
import RequestsController from '@controllers/requests.controller';
import { AcceptRequestDto, CreateRequestDto } from '@dtos/requests.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class RequestRoute implements Route {
  public path = '/requests';
  public router = Router();
  public requestsController = new RequestsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/accept`, validationMiddleware(AcceptRequestDto, 'body'), this.requestsController.acceptRequest);
    this.router.get(`${this.path}`, this.requestsController.getRequests);
    this.router.get(`${this.path}/:id(\\d+)`, this.requestsController.getRequestById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRequestDto, 'body'), this.requestsController.createRequest);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateRequestDto, 'body', true), this.requestsController.updateRequest);
    this.router.delete(`${this.path}/:id(\\d+)`, this.requestsController.deleteRequest);
  }
}

export default RequestRoute;
