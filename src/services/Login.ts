import UserModel from '../models/User';
import AuditLogModel from '../models/AuditLog';
import * as Resp from '../utils/Response';
import * as HttpStatusCode from '../constants/HttpStatusCode';
import jwt from 'jsonwebtoken';
import config from '../config';

export default async (payload: { username: string; password: string }) => {
  try {
    const user = await UserModel.findOne({
      where: {
        userName: payload.username,
        password: payload.password
      }
    });

    if (!user) {
      return Resp.formatServiceReturn(
        false,
        HttpStatusCode.UNAUTHORIZED,
        null,
        'Unauthorized'
      );
    }

    // audit-log
    await AuditLogModel.create({
      sourceFrom: 'user',
      actionType: 'login',
      userId: user.userId
    });

    const token = jwt.sign({ userId: user.userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiry
    });

    return Resp.formatServiceReturn(true, HttpStatusCode.OK, { token }, 'OK');
  } catch (error) {
    console.log(`function: loginService; error: ${error}`);

    return Resp.formatServiceReturn(
      true,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      null,
      'Something went wrong'
    );
  }
};
