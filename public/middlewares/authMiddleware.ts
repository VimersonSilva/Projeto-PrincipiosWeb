import {Request, Response, NextFunction} from 'express';

// Extend the Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: { role: string; [key: string]: any };
    }
  }
}
import {verifyToken} from '../utils/auth';

export const authenticate = (req: Request, res:Response, next:NextFunction): Promise<void> | void => {
    const token = req.header('Authorization')?.replace('Bearer', '');

    if(!token){
        return next(new Error('Access denied. No token provided'));
    }

    try{
        const decoded = verifyToken(token);
        (req as any).user = decoded  //Add user decodificado ao objeto `req`
        next();
    } catch(err){
        res.status(400).json({message: 'Invalid token'});
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };