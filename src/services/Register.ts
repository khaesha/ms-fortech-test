import * as crypto from 'crypto';

import UserModel from '../models/User';
import AuditLogModel from '../models/AuditLog';
import { sequelize } from '../models/db';
import * as Resp from '../utils/Response';
import * as HttpStatusCode from '../constants/HttpStatusCode';

export default async (payload: any) => {
  const transaction = await sequelize.transaction();

  try {
    await UserModel.create(
      {
        userName: payload.username,
        fullName: payload.fullname,
        password: crypto
          .createHash('md5')
          .update(payload.password)
          .digest('hex')
      },
      {
        transaction
      }
    );

    // add activity to audit-log
    await AuditLogModel.create(
      {
        sourceFrom: 'user',
        actionType: 'register'
      },
      { transaction }
    );

    await transaction.commit();

    return Resp.formatServiceReturn(true, HttpStatusCode.CREATED, null, 'OK');
  } catch (error) {
    console.log(`function: registerService; error: ${error}`);

    await transaction.rollback();

    return Resp.formatServiceReturn(
      false,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      null,
      'Something went wrong'
    );
  }
};
