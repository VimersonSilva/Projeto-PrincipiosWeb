import { User } from "../models/user";
export class UserRepository {
 // Criar um novo usuário
 async create(data: { name: string; email: number; password: string}) {
    return await User.create(data);
  }

 // 🔹 Buscar todos os usuarios
   async findAll() {
     return await User.findAll();
   }
 
   // 🔹 Buscar um usuario por ID
   async findById(id: number) {
     return await User.findByPk(id);
   }
 
   // 🔹 Atualizar um usuario
   async update(id: number, updatedData: { name?: string; email?: string; password?: string }) {
     const user = await User.findByPk(id);
     if (!user) return null;
 
     return await user.update(updatedData);
   }
 
   // 🔹 Excluir um usuario
   async delete(id: number) {
     const user = await User.findByPk(id);
     if (!user) return null;
 
     await user.destroy();
     return { message: "Usuario removido com sucesso" };
   }
 }
 
 
