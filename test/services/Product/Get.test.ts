import ProductGetService from '../../../src/services/Product/Get';
import ProductModel from '../../../src/models/Product';
import * as HttpStatusCode from '../../../src/constants/HttpStatusCode';

jest.mock('../../../src/models/Product', () => ({
  findOne: jest.fn()
}));

describe('ProductGetService', () => {
  const mockPayload = {
    productId: 1
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return not found', async () => {
    (ProductModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    const result = await ProductGetService(mockPayload);

    expect(result.status).toBeFalsy();
    expect(result.code).toBe(HttpStatusCode.NOT_FOUND);
  });

  it('should return product data', async () => {
    const mockProduct = {
      productId: 1,
      productName: 'soap'
    };

    (ProductModel.findOne as jest.Mock).mockResolvedValueOnce(mockProduct);

    const result = await ProductGetService(mockPayload);

    expect(result.status).toBeTruthy();
    expect(result.code).toBe(HttpStatusCode.OK);
  });
});
