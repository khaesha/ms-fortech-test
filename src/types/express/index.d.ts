export {}

declare global {
  namespace Express {
    export interface Request {
      ctx: Map<any, any>;
    }
  }
}
