import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User, UserExtend } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: UserExtend[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: UserExtend = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getUserByUserName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userName = req.params.name;
      const findOneUserData: User = await this.userService.getUserByUserName(userName);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public addCityForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = req.body.data.userId;
      const cityId: number = req.body.data.cityId;
      const createUserData: User = await this.userService.addCity(userId, cityId);

      res.status(201).json({ data: createUserData, message: 'city success append' });
    } catch (error) {
      next(error);
    }
  };

  public removeCityFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = req.body.data.userId;
      const cityId: number = req.body.data.cityId;
      const createUserData: User = await this.userService.removeCity(userId, cityId);

      res.status(201).json({ data: createUserData, message: 'city success removed' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
