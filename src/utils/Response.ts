import { Response } from 'express';
import * as HttpStatusCode from '../constants/HttpStatusCode';

interface IGeneralObject {
  res: Response;
  err?: any;
  message?: any;
  data?: any;
}

const sendResponse = (
  res: Response,
  code: number,
  message: any,
  data?: any,
  error?: any
) => {
  const result: any = {
    message,
    success: true
  };

  if (data) {
    result.data = data;
  }

  if (error) {
    result.success = false;
  }

  res.status(code);
  res.json(result);
};

const badRequest = (obj: IGeneralObject) => {
  const { message, err, res } = obj;
  let code = HttpStatusCode.BAD_REQUEST;
  let msg = message;

  if (err && err.message) {
    msg = err.message;
  }

  if (message?.code) {
    code = message?.code;
    msg = message?.message;
  }

  sendResponse(res, code, msg, null, err);
};

const formatServiceReturn = (
  status: boolean,
  code: number,
  data: any,
  message: string
) => {
  return { status, code, data, message };
};

const conflict = (obj: IGeneralObject) => {
  sendResponse(obj.res, HttpStatusCode.CONFLICT, obj.message, null, obj.err);
};

const internalError = (obj: IGeneralObject) => {
  sendResponse(
    obj.res,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    obj.message,
    null,
    obj.err
  );
};

const notFound = (obj: IGeneralObject) => {
  sendResponse(obj.res, HttpStatusCode.NOT_FOUND, obj.message, null, obj.err);
};

const ok = (obj: IGeneralObject) => {
  sendResponse(obj.res, HttpStatusCode.OK, obj.message, obj.data);
};

const formatClientErrorResponse = (res: Response, data: any, err?: any) => {
  const message = data?.message;

  if (data.code === HttpStatusCode.CONFLICT) {
    conflict({ res, err, message });
  } else if (data.code === HttpStatusCode.BAD_REQUEST) {
    badRequest({ res, err, message });
  } else if (data.code === HttpStatusCode.INTERNAL_SERVER_ERROR) {
    let error = err;

    if (!err) {
      error = new Error(message);
    }

    internalError({ res, message, err: error });
  } else {
    notFound({ res, message, err });
  }
};

export { badRequest, formatServiceReturn, formatClientErrorResponse, ok };
