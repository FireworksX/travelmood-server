import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ContactCell, ContactType } from '@interfaces/contacts.interface';

export type ContactsCreationAttributes = Optional<ContactCell, 'id'>;

export class ContactsModel extends Model<ContactCell, ContactsCreationAttributes> implements ContactCell {
  public id: number;
  public type: ContactType;
  public value: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ContactsModel {
  ContactsModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'contacts',
      sequelize,
    },
  );

  return ContactsModel;
}
