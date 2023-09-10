import ProductModel from '../../models/Product';
import * as HttpStatusCode from '../../constants/HttpStatusCode';
import * as Resp from '../../utils/Response';

export default async (payload: any) => {
  try {
    const product = await ProductModel.findOne({
      where: {
        productId: payload.productId
      }
    });

    if (!product) {
      return Resp.formatServiceReturn(
        false,
        HttpStatusCode.NOT_FOUND,
        null,
        'Data not found'
      );
    }

    return Resp.formatServiceReturn(true, HttpStatusCode.OK, product, 'OK');
  } catch (error) {
    console.log(`function: Product.getService; error: ${error}`);

    return Resp.formatServiceReturn(
      false,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      null,
      'Something went wrong'
    );
  }
};
