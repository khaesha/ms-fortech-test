import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db';

class Product extends Model {
  declare productId: number;
  declare productName: string;
}

Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'products',
    underscored: true,
    modelName: 'product',
    freezeTableName: true,
    timestamps: false,
    sequelize
  }
);

export default Product;
