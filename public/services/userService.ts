import { User } from '../models/user';
import { Op } from 'sequelize';
import { hashPassword } from '../utils/auth';

export class UserService {
/*    users: User[];

constructor() {
    this.users = [];
}*/
    async getUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });

    }

    async getUserByName(username: string): Promise<User | null> {
        return await User.findOne({ where: { name: username } });

    }

    async getUserByNameOrEmail(username: string, email: string): Promise<User | null> {
        return await User.findOne({
            where: {
                [Op.or]: [
                    { name: username },
                    { email: email }
                ]
            }
        });
    }
    
/*    users: User[];

    constructor() {
        this.users = [];
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const user = User.build({ id: this.users.length + 1, name, email, password });
        this.addUser(user);
        return user;     
    }

    addUser(user: User): void {
        this.users.push(user);
        console.log("Usuario cadastrado: ", user);
    }

       
    getUserById(id: number): User | string {        
        return this.users.find(user => user.id === id) || "Usuário não encontrado";;
    }    
       

    getAllUsers(): User[] {
        return this.users;
    }

    updateUser(id: number, newData: Partial<User>): void {
        const user = this.getUserById(id);
        if (typeof user === 'string') {
            console.log("Usuário não encontrado");
            return;
        }
        user.name = newData.name || user.name;

        user.email = newData.email || user.email;
        console.log("Usuário atualizado: ", user);
    }

    removeUserById(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
        console.log("Usuário removido: ", id);
    }


}*/ 

/*
async createUser(name: string, email: string, password: string): Promise<User> {
    const user = User.build({ id: this.users.length + 1, name, email, password });
    this.addUser(user);
    return user;     
}*/

/*addUser(user: User): void {
    this.users.push(user);
    console.log("Usuario cadastrado: ", user);
}*/
async createUser(name: string, email: string, password: string): Promise<User> {
    // Criptografa a senha antes de salvar
    const hashedPassword = await hashPassword(password);

    // Cria o usuário no banco de dados
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
}
async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
}

async getAllUsers(): Promise<User[]> {
    return await User.findAll();
}

async updateUser(id: number, newData: Partial<User>): Promise<void> {
    const user = await User.findByPk(id);
    if (!user) return;
    await user.update(newData);
}

async removeUserById(id: number): Promise<void> {
    await User.destroy({ where: { id } });
}
}
