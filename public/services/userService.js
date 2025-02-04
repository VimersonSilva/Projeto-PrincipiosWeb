export class UserService {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
        console.log("Usuario cadastrado: ", user);
    }

    getUserById(id) {
        return this.users.find(user => user.id === id) || "Usuário não encontrado";
    }


    updateUser(id, newData){
        const user = this.getUserById(id);
        if(user === "Usuário não encontrado") {
            console.log("Usuário não encontrado");
            return;
        }
        user.name = newData.name;
        user.email = newData.email;
        console.log("Usuário atualizado: ", user);
    }

    removeUserById(id) {
        this.users = this.users.filter(user => user.id !== id);
        console.log("Usuário removido: ", id);
    }
}