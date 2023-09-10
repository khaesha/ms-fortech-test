import AuditLogGetAllService from '../../../src/services/AuditLog/GetAll';
import AuditLogModel from '../../../src/models/AuditLog';
import * as HttpStatusCode from '../../../src/constants/HttpStatusCode';

jest.mock('../../../src/models/AuditLog', () => ({
  findAll: jest.fn()
}));

describe('AuditLogGetAllService', () => {
  const mockContext = new Map();
  mockContext.set('user', {
    userId: 1
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return audit log data', async () => {
    const mockAuditLog = [
      {
        id: 1,
        sourceFrom: 'user',
        actionType: 'login'
      },
      {
        id: 2,
        sourceFrom: 'user',
        actionType: 'create-product'
      }
    ];

    (AuditLogModel.findAll as jest.Mock).mockResolvedValueOnce(mockAuditLog);

    const result = await AuditLogGetAllService(mockContext);

    expect(result.status).toBeTruthy();
    expect(result.code).toBe(HttpStatusCode.OK);

  });
  it('should return empty array if data empty', async () => {
    (AuditLogModel.findAll as jest.Mock).mockResolvedValueOnce([]);

    const result = await AuditLogGetAllService(mockContext);

    expect(result.status).toBeTruthy();
    expect(result.code).toBe(HttpStatusCode.OK);
    expect(result.data).toEqual([]);
  });
});
