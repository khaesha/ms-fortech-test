import RegisterService from '../../src/services/Register';
import { sequelize } from '../../src/models/db';
import UserModel from '../../src/models/User';
import AuditLogModel from '../../src/models/AuditLog';
import * as HttpStatusCode from '../../src/constants/HttpStatusCode';

jest.mock('../../src/models/db');
jest.mock('../../src/models/User', () => ({
  create: jest.fn()
}));
jest.mock('../../src/models/AuditLog', () => ({
  create: jest.fn()
}))

describe('RegisterService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register user data', async () => {
    const mockPayload: any = {
      username: 'john',
      fullname: 'John Wick',
      password: 'abc123'
    };
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn()
    };

    (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
    (UserModel.create as jest.Mock).mockResolvedValueOnce(true);
    (AuditLogModel.create as jest.Mock).mockResolvedValueOnce(true);

    const result = await RegisterService(mockPayload);

    expect(UserModel.create).toHaveBeenCalledTimes(1);
    expect(AuditLogModel.create).toHaveBeenCalledTimes(1);
    expect(mockTransaction.commit).toHaveBeenCalledTimes(1);
    expect(mockTransaction.rollback).not.toHaveBeenCalled();

    expect(result.code).toBe(HttpStatusCode.CREATED);
    expect(result.status).toBeTruthy();
  });
});
