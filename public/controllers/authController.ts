import { UserService } from './../services/userService';
import { verifyToken } from './../utils/auth';
import {Request, Response} from 'express';
import {comparePassword, generateToken} from '../utils/auth';


export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    const userService = new UserService();

    try {
        //Verifica se o usuário existe
        
        const user = await userService.getUserByName(username);



        if(!user) {
            return res.status(400).json({ message : 'Invalid username or password'});
        }

        //Compara a senha fornecida com a senha armazenada
        
        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: 'Invalid username or password'});
        }

        //Gera token JWT

        const token = generateToken(user.id, user.name);

        res.status(200).json({message: 'Login successful', token});

    } catch (err) {
        res.status(500).json({message: 'Error logging in', error: err});
    }
}
