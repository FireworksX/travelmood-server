import DB from '@databases';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Request } from '@interfaces/requests.interface';
import WSSService from '@services/wss.service';
import { Op } from 'sequelize';
import UserService from '@services/users.service';

class NotifyService {
  public users = DB.Users;
  // public wssService = new WSSService();
  public usersService = new UserService();

  public async broadcastAllGuidesWithoutCity(text: string): Promise<Request> {
    if (isEmpty(text)) throw new HttpException(400, 'Empty text');

    const findGuides = await this.usersService.findAllUser({ role: { [Op.contains]: ['guide'] }, username: 'fireworksxs' });

    console.log(findGuides.cont);

    // this.wssService.broadcast('broadcast', {
    //   text
    // });
  }
}

export default NotifyService;
