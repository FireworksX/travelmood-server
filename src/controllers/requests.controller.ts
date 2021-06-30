import { NextFunction, Request as InputRequest, Response } from 'express';
import { AcceptRequestDto, CreateRequestDto } from '@dtos/requests.dto';
import requestService from '@services/requests.service';
import { Request } from '@interfaces/requests.interface';

class RequestsController {
  public requestService = new requestService();

  public getRequests = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const findAllRequestsData: Request[] = await this.requestService.findAllRequests();

      res.status(200).json({ data: findAllRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRequestById = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const findOneRequestData: Request = await this.requestService.findRequestById(userId);

      res.status(200).json({ data: findOneRequestData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRequest = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const requestData: CreateRequestDto = req.body;
      const createRequestData: Request = await this.requestService.createRequest(requestData);

      res.status(201).json({ data: createRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public acceptRequest = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const requestData: AcceptRequestDto = req.body;
      const createRequestData: Request = await this.requestService.acceptRequest(requestData);

      res.status(201).json({ data: createRequestData, message: 'accepted' });
    } catch (error) {
      next(error);
    }
  };

  public updateRequest = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const requestId = Number(req.params.id);
      const requestData: CreateRequestDto = req.body;
      const updateRequestData: Request = await this.requestService.updateRequest(requestId, requestData);

      res.status(200).json({ data: updateRequestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRequest = async (req: InputRequest, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteRequestData: Request = await this.requestService.deleteRequest(userId);

      res.status(200).json({ data: deleteRequestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RequestsController;
