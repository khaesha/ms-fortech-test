import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db';

class AuditLog extends Model {
  declare id: number;
  declare sourceFrom: number;
  declare actionType: string;
  declare userId: string;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sourceFrom: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    actionType: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: 'audit_logs',
    underscored: true,
    modelName: 'auditLog',
    freezeTableName: true,
    timestamps: false,
    sequelize
  }
);

export default AuditLog;
