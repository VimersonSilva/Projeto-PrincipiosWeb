import {Request, Response, NextFunction} from 'express';
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