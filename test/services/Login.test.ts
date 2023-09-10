import LoginService from '../../src/services/Login';
import AuditLogModel from '../../src/models/AuditLog';
import UserModel from '../../src/models/User';
import * as HttpStatusCode from '../../src/constants/HttpStatusCode';
import jwt from 'jsonwebtoken';

jest.mock('../../src/models/User', () => ({
  findOne: jest.fn()
}));
jest.mock('../../src/models/AuditLog', () => ({
  create: jest.fn()
}));
jest.mock('jsonwebtoken');

describe('LoginService', () => {
  const mockPayload = {
    username: 'john',
    password: 'abc123'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return unauthorize if user not found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    const result = await LoginService(mockPayload);

    expect(UserModel.findOne).toHaveBeenCalledTimes(1);
    expect(AuditLogModel.create).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();

    expect(result.status).toBeFalsy();
    expect(result.code).toBe(HttpStatusCode.UNAUTHORIZED);
  });

  it('should return success and return token if user login sucess', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce({
      userId: 1,
      userName: 'john',
      fullName: 'John Wick'
    });
    (jwt.sign as jest.Mock).mockResolvedValueOnce('abc.12jfkdls.9ffjdsl');
    (AuditLogModel.create as jest.Mock).mockResolvedValueOnce(true);

    const result = await LoginService(mockPayload);

    expect(UserModel.findOne).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(AuditLogModel.create).toHaveBeenCalledTimes(1);

    expect(result.status).toBeTruthy();
    expect(result.code).toBe(HttpStatusCode.OK);
  });
});
