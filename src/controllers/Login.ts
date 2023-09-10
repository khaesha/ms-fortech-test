import { Request, Response, NextFunction } from 'express';
import LoginValidation from '../validations/Login';
import { badRequest } from '../utils/Response';
import LoginService from '../services/Login';
import * as Resp from '../utils/Response';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const input = {
      ...body
    };

    try {
      await LoginValidation().validateAsync(input);
    } catch (err) {
      return badRequest({ res, err });
    }

    const result = await LoginService(input);

    if (!result.status) {
      return Resp.formatClientErrorResponse(res, result);
    }

    return Resp.ok({ res, message: result.message, data: result.data });
  } catch (error) {
    console.log(`function: login; error: ${error}`);
  }
};
