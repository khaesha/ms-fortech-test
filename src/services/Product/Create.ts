import ProductModel from '../../models/Product';
import AuditLogModel from '../../models/AuditLog';
import { sequelize } from '../../models/db';
import * as Resp from '../../utils/Response';
import * as HttpStatusCode from '../../constants/HttpStatusCode';
import { Context } from '../../types';

export default async (payload: { productName: string }, ctx: Context) => {
  const user = ctx.get('user');

  const transaction = await sequelize.transaction();

  try {
    await ProductModel.create(
      {
        productName: payload.productName
      },
      { transaction }
    );

    // add activity to audit-log
    await AuditLogModel.create(
      {
        sourceFrom: 'product',
        actionType: 'create-product',
        userId: user.userId
      },
      { transaction }
    );

    await transaction.commit();

    return Resp.formatServiceReturn(true, HttpStatusCode.CREATED, null, 'OK');
  } catch (error) {
    console.log(`function: Product.createService; error: ${error}`);

    await transaction.rollback();

    return Resp.formatServiceReturn(
      false,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      null,
      'Something went wrong'
    );
  }
};
