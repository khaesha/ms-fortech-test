import { Request, Response, NextFunction } from 'express';
import * as Resp from '../utils/Response';
import AuditLogGetAllService from '../services/AuditLog/GetAll';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { ctx } = req;

  try {
    const result = await AuditLogGetAllService(ctx);

    if (!result.status) {
      Resp.formatClientErrorResponse(res, result);
    }

    Resp.ok({ res, message: result.message, data: result.data });
  } catch (error) {
    console.log(`function: getAll; error: ${error}`);
    next(error);
  }
};
