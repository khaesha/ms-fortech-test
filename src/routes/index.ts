import { Router, Request, Response } from 'express';
import LoginController from '../controllers/Login';
import RegisterController from '../controllers/Register';
import * as AuditLogController from '../controllers/AuditLog';
import * as ProductController from '../controllers/Product';
import { OK } from '../constants/HttpStatusCode';

// load middleware
import { auth }  from '../middlewares';

const router = Router();

router.get('/health', (req: Request, res: Response) =>
  res.status(OK).json({
    message: 'PONG',
    date: new Date()
  })
);
// Login & Register
router.post('/register', RegisterController);
router.post('/login', LoginController);
// Product
router.post('/product', [auth], ProductController.create);
router.get('/product/:productId', [auth], ProductController.get);
router.get('/product', [auth], ProductController.getAll);
// AuditLog
router.get('/audit-log', [auth], AuditLogController.getAll);

export default router;
