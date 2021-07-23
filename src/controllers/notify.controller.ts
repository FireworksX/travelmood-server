import { NextFunction, Request, Response } from 'express';
import NotifyService from '@/services/notify.service';

class NotifyController {
  public notifyService = new NotifyService();

  public broadcastAllGuidesWithoutCity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const text: string = req.body.text;
      await this.notifyService.broadcastAllGuidesWithoutCity(text);

      res.status(201).json({ data: text, message: 'notify success' });
    } catch (error) {
      next(error);
    }
  };
}

export default NotifyController;
