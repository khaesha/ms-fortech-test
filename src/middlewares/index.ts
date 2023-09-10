import { Request, Response, NextFunction } from 'express';
import jwt, { CustomJwtPayload, JwtPayload } from 'jsonwebtoken';
import config from '../config';

declare module 'jsonwebtoken' {
  export interface CustomJwtPayload extends JwtPayload {
    userId: string;
  }
}

export const context = (req: Request, res: Response, next: NextFunction) => {
  const ctx = new Map();

  ctx.clear = () => {
    throw new Error("Can't clear context");
  };

  ctx.delete = () => {
    throw new Error("Can't delete context");
  };

  req.ctx = ctx;

  next();
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = <CustomJwtPayload>jwt.verify(token, config.jwt.secret);

    req.ctx.set('user', { userId: decoded.userId });

    next();
  } catch (error) {
    res.status(401).send('Unauthorize');
  }
};
