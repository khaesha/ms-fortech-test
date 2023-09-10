import AuditLogModel from '../../models/AuditLog';
import * as Resp from '../../utils/Response';
import * as HttpStatusCode from '../../constants/HttpStatusCode';
import { Context } from '../../types';

export default async (ctx: Context) => {
  const user = ctx.get('user');

  try {
    const auditLogs = await AuditLogModel.findAll({
      where: {
        userId: user.userId
      }
    });

    return Resp.formatServiceReturn(true, HttpStatusCode.OK, auditLogs, 'OK');
  } catch (error) {
    console.log(`function: auditLog.getAllService; error: ${error}`);

    return Resp.formatServiceReturn(
      true,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      null,
      'Something went wrong'
    );
  }
};
