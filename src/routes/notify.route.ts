import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import NotifyController from '@controllers/notify.controller';

class NotifyRoute implements Route {
  public path = '/notify';
  public router = Router();
  public notifyController = new NotifyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.notifyController.broadcastAllGuidesWithoutCity);
  }
}

export default NotifyRoute;
