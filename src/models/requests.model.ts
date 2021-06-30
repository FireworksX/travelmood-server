import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Request } from '@interfaces/requests.interface';

export type RequestCreationAttributes = Optional<Request, 'id' | 'phone'>;

export class RequestModel extends Model<Request, RequestCreationAttributes> implements Request {
  public id: number;
  public user_id: number;
  public name: string;
  public city: string;
  public text: string;
  public phone: string | null;
  public accept_guides: number[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RequestModel {
  RequestModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(45),
      },
      city: {
        type: DataTypes.STRING(45),
      },
      text: {
        type: DataTypes.STRING(255),
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      accept_guides: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      tableName: 'requests',
      sequelize,
    },
  );

  return RequestModel;
}
