import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { City } from '@interfaces/cities.interface';

export type CitiesCreationAttributes = Optional<City, 'id'>;

export class CitiesModel extends Model<City, CitiesCreationAttributes> implements City {
  public id: number;
  public name: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CitiesModel {
  CitiesModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'cities',
      sequelize,
    },
  );

  return CitiesModel;
}
