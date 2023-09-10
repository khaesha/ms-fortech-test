import ProductCreateService from '../../../src/services/Product/Create';
import { sequelize } from '../../../src/models/db';
import ProductModel from '../../../src/models/Product';
import AuditLogModel from '../../../src/models/AuditLog';
import * as HttpStatusCode from '../../../src/constants/HttpStatusCode';

jest.mock('../../../src/models/db');
jest.mock('../../../src/models/Product', () => ({
  create: jest.fn()
}));
jest.mock('../../../src/models/AuditLog', () => ({
  create: jest.fn()
}))

describe('ProductCreateService', () => {
  const mockContext = new Map();
  mockContext.set('user', {
    userId: 1
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new product', async () => {
    const mockPayload = {
      productName: 'soap'
    };
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn()
    };

    (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
    (ProductModel.create as jest.Mock).mockResolvedValueOnce(true);
    (AuditLogModel.create as jest.Mock).mockResolvedValueOnce(true);

    const result = await ProductCreateService(mockPayload, mockContext);

    expect(ProductModel.create).toHaveBeenCalledTimes(1);
    expect(AuditLogModel.create).toHaveBeenCalledTimes(1);
    expect(mockTransaction.commit).toHaveBeenCalledTimes(1);
    expect(mockTransaction.rollback).not.toHaveBeenCalled();

    expect(result.code).toBe(HttpStatusCode.CREATED);
    expect(result.status).toBeTruthy();
  });
});
