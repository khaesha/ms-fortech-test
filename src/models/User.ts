import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db';

class User extends Model {
  declare userId: number;
  declare userName: string;
  declare fullName: string;
  declare password: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'users',
    underscored: true,
    modelName: 'user',
    freezeTableName: true,
    timestamps: false,
    sequelize
  }
);

export default User;
