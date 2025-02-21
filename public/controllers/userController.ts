import {Request, Response} from "express";
import { UserService } from '../services/userService';

export class UserController{
    userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response){
        try{
            const {name, email, password} = req.body;

            if(!name || !email || !password){
                res.status(400).json({message: "Todos os campos são obrigatórios."});
                return;
            }
            const user = await this.userService.createUser(name, email, password);
            return res.status(201).json(user);
        } catch( error:any){
            return res.status(400).json({error: error.message});
        }
    }

    async getAllUser(req:Request, res:Response){
        const products = this.userService.getAllUsers();
        return res.json(products);
    }

    async getUserById(req:Request, res:Response){
        try{
            const user = await this.userService.getUserById(Number(req.params.id));
            if(!user){
                return res.status(404).json({error: "Usuário não encontrado"});
            }
            return res.json(user);
        } catch(error:any){
            return res.status(400).json({error: error.message});
        }
    }

    async updateUser(req: Request, res:Response) {
        try{
            const user = await this.userService.updateUser(Number(req.params.id), req.body);
            if(!user)  return res.status(404).json({error: "Usuario não encontrado"});

            return res.json(user);
        } catch (error: any){
            return  res.status(400).json({error: error.message});
        }
    }

    async delete(req: Request, res: Response){
        try{
            const message = this.userService.deleteUser(Number(req.params.id));

            if(!message) {
                return res.status(404).json({error: "Usuario não encontrado"});
            }

            return res.status(203).json(message);
        } catch (error: any){
            return res.status(400).json({error: error.message});
        }
    }
}