import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../utils/Response';
import RegisterValidation from '../validations/Register';
import RegisterService from '../services/Register';
import * as Resp from '../utils/Response';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const input = {
      ...body
    };

    try {
      await RegisterValidation().validateAsync(input);
    } catch (err) {
      return badRequest({ res, err });
    }

    const result = await RegisterService(input);

    if (!result.status) {
      Resp.formatClientErrorResponse(res, result);
    }

    Resp.ok({ res, message: result.message });
  } catch (error) {
    console.log(`function: register; error: ${error}`);
    next(error);
  }
};
