import { Request, Response, NextFunction } from 'express';
import { badRequest } from '../utils/Response';
import ProductCreateValidation from '../validations/Product/Create';
import ProductGetValidation from '../validations/Product/Get';
import ProductCreateService from '../services/Product/Create';
import ProductGetService from '../services/Product/Get';
import ProductGetAllService from '../services/Product/GetAll';
import * as Resp from '../utils/Response';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { ctx } = req;

  try {
    const { body } = req;

    const input = {
      ...body
    };

    try {
      await ProductCreateValidation().validateAsync(input);
    } catch (err) {
      return badRequest({ res, err });
    }

    const result = await ProductCreateService(input, ctx);

    if (!result.status) {
      Resp.formatClientErrorResponse(res, result);
    }

    Resp.ok({ res, message: result.message });
  } catch (error) {
    console.log(`function: create; error: ${error}`);
    next(error);
  }
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;

    const input = {
      ...params
    };

    try {
      await ProductGetValidation().validateAsync(input);
    } catch (err) {
      return badRequest({ res, err });
    }

    const result = await ProductGetService(input);

    if (!result.status) {
      Resp.formatClientErrorResponse(res, result);
    }

    Resp.ok({ res, message: result.message, data: result.data });
  } catch (error) {
    console.log(`function: get; error: ${error}`);
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ProductGetAllService();

    if (!result.status) {
      Resp.formatClientErrorResponse(res, result);
    }

    Resp.ok({ res, message: result.message, data: result.data });
  } catch (error) {
    console.log(`function: getAll; error: ${error}`);
    next(error);
  }
};

export { create, get, getAll };
