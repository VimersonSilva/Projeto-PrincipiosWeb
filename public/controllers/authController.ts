import { UserService } from '../services/userService';
import { Request, Response } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; name: string; role: string };
        }
    }
}
import { comparePassword, generateToken, hashPassword } from '../utils/auth';
import { User } from '../models/user'; 

export class AuthController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    /**
     * Realiza o login do usuário
     */
    public login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        try {
            // Validação básica
            if (!username || !password) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Username and password are required' 
                });
            }

            const user = await this.userService.getUserByName(username)||await this.userService.getUserByEmail(username);;

            if (!user) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Invalid credentials' 
                });
            }

            const isPasswordValid = await comparePassword(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Invalid credentials' 
                });
            }

            const token  = generateToken(user.id, user.name, user.role || 'user');


            // Remove a senha do objeto user antes de enviar
            if (typeof user !== 'object' || !('password' in user)) {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unexpected user data format' 
                });
            }
            const { password: _, ...userData } = user;

            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user: userData
            });

        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ 
                success: false,
                message: 'Internal server error' 
            });
        }
    }

    /**
     * Registra um novo usuário
     */
    public register = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        try {
            // Validação básica
            if (!username || !email || !password) {
                return res.status(400).json({ 
                    success: false,
                    message: 'All fields are required' 
                });
            }

            // Verifica se o usuário já existe
            const existingUser = await this.userService.getUserByNameOrEmail(username, email);
            
            if (existingUser) {
                return res.status(409).json({ 
                    success: false,
                    message: 'User already exists' 
                });
            }

            // Cria o novo usuário
            const newUser = await this.userService.createUser(
                username,
                email,
                password
            );

            // Gera token para o novo usuário
            const token = generateToken(newUser.id, newUser.name, newUser.role || 'user');


            // Remove a senha do objeto user antes de enviar
            const { password: _, ...userData } = newUser;

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                token,
                user: userData
            });

        } catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ 
                success: false,
                message: 'Internal server error' 
            });
        }
    }

    // Obtém informações do usuário atua
    public getCurrentUser = async (req: Request, res: Response) => {
        try {
            // O middleware de autenticação já adicionou o usuário à requisição
            if (!req.user) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Not authenticated' 
                });
            }

            const user = await this.userService.getUserById(Number(req.user.id));
            
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'User not found' 
                });
            }

            // Remove a senha do user antes de enviar
            if (typeof user !== 'object' || !('password' in user)) {
                return res.status(500).json({ 
                    success: false,
                    message: 'Unexpected user data format' 
                });
            }
            const { password: _, ...userData } = user;
            res.status(200).json({
                success: true,
                user: userData
            });

        } catch (err) {
            console.error('Get current user error:', err);
            res.status(500).json({ 
                success: false,
                message: 'Internal server error' 
            });
        }
    }

    /**
     * Realiza o logout do usuário
     */
    public logout = async (req: Request, res: Response) => {
        try {
            // Em um sistema JWT stateless, o logout é feito no cliente
            // Poderíamos implementar uma blacklist de tokens aqui se necessário
            res.status(200).json({ 
                success: true,
                message: 'Logout successful' 
            });
        } catch (err) {
            console.error('Logout error:', err);
            res.status(500).json({ 
                success: false,
                message: 'Internal server error' 
            });
        }
    }
}

// Exporta uma instância pronta para uso
export const authController = new AuthController();