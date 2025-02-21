import { User } from '../models/user';
import { UserRepository } from '../repository/userRepository';

export class UserService {
    userRepository: UserRepository;
    
    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser(name: string, email: string, password: string): void {
        if(password.length < 6 ){
            throw new Error("A senha de ve ter pelo menos 6 caracteres.");
        }
        this.userRepository.createUser(name, email, password);
        console.log("Usuario cadastrado!");
    }

    async getAllUsers() {
          return await this.userRepository.findAll();
        }
      
        async getUserById(id: number) {
          return await this.userRepository.findById(id);
        }
      
        async updateUser(id: number, updatedData: { name?: string; email?: string; password?: string }) {
          return await this.userRepository.update(id, updatedData);
        }
      
        async deleteUser(id: number) {
          return await this.userRepository.delete(id);
        }
}
