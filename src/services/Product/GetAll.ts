import ProductModel from '../../models/Product';
import * as HttpStatusCode from '../../constants/HttpStatusCode';
import * as Resp from '../../utils/Response';

export default async () => {
  try {
    const products = await ProductModel.findAll({});

    return Resp.formatServiceReturn(
      true, 
      HttpStatusCode.OK, 
      products, 
      'OK'
    );
  } catch (error) {
    console.log(`function: Product.getAllService; error: ${error}`);

    return Resp.formatServiceReturn(
      false,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      null,
      'Something went wrong'
    );
  }
};
