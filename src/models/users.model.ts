import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User, UserRole } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public first_name: string | null;
  public last_name: string | null;
  public tg_chat_id: number | null;
  public email: string | null;
  public password: string;
  public username: string;
  public role: UserRole[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      last_name: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      role: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      tg_chat_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
