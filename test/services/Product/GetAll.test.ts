import ProductGetAllService from '../../../src/services/Product/GetAll';
import ProductModel from '../../../src/models/Product';
import * as HttpStatusCode from '../../../src/constants/HttpStatusCode';

jest.mock('../../../src/models/Product', () => ({
  findAll: jest.fn()
}));

describe('ProductGetAllService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return product data', async () => {
    const mockProduct = [
      {
        productId: 1,
        productName: 'soap'
      },
      {
        productId: 2,
        productName: 'shampoo'
      }
    ];

    (ProductModel.findAll as jest.Mock).mockResolvedValueOnce(mockProduct);

    const result = await ProductGetAllService();

    expect(result.status).toBeTruthy();
    expect(result.code).toBe(HttpStatusCode.OK);
  });

  it('should return empty array if data empty', async () => {
    (ProductModel.findAll as jest.Mock).mockResolvedValueOnce([]);

    const result = await ProductGetAllService();

    expect(result.status).toBeTruthy();
    expect(result.code).toBe(HttpStatusCode.OK);
    expect(result.data).toEqual([]);
  });
});
