import { User } from '../models/user';

export class UserService {
    users: User[];

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
        return this.users.find(user => user.id === id) || "Usuário não encontrado";
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
}
