import {User} from '../public/models/user';
import {UserService} from '../public/services/userService';
import {UserRepository} from '../public/repository/userRepository';
const chai = require("chai");
const { expect } = chai;

describe('Teste do usuário', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        userService = new UserService();
    });
    beforeEach(async () => {
        await userRepository.deleteAll(); 
    });

    it("teste para ver se nome está correto", () => {
        const user = User.build({ id: 1, name: "Joao", email: "joao@gmail.com", password: "joao123456" });
        expect(user.name).to.equal('Joao');
    });

    it("teste de criação de usuário", async () => {
        const user = await userRepository.create({ name: "Maria", email: "maria@gmail.com", password: "maria123" });
        expect(user.name).to.equal("Maria");
        expect(user.email).to.equal("maria@gmail.com");
    });

    it("teste para buscar todos os usuários", async () => {
        await userRepository.create({ name: "Joao", email: "joao@gmail.com", password: "joao123456" });
        const users = await userRepository.findAll();
        expect(users.length).to.be.greaterThan(0);
    });

    it("teste para buscar usuário por ID", async () => {
        const user = await userRepository.create({ name: "Carlos", email: "carlos@gmail.com", password: "carlos123" });
        const foundUser = await userRepository.findById(user.id);
        if (foundUser) {
            expect(foundUser.name).to.equal("Carlos");
            expect(foundUser.email).to.equal("carlos@gmail.com");
        } else {
            throw new Error("User not found");
        }
    });

    it("teste para atualizar usuário", async () => {
        const user = await userRepository.create({ name: "Lucas", email: "lucas@gmail.com", password: "lucas123" });
        const updatedUser = await userRepository.update(user.id, { name: "Lucas Updated", email: "lucas.updated@gmail.com" });
        if (updatedUser) {
            expect(updatedUser.name).to.equal("Lucas Updated");
            expect(updatedUser.email).to.equal("lucas.updated@gmail.com");
        } else {
            throw new Error("Updated user is null");
        }
    });

    it("teste para excluir usuário", async () => {
        const user = await userRepository.create({ name: "Amanda", email: "amanda@gmail.com", password: "amanda123" });
        const deleteResponse = await userRepository.delete(user.id);
        if (deleteResponse) {
            expect(deleteResponse.message).to.equal("Usuario removido com sucesso");
        } else {
            throw new Error("Delete response is null");
        }
        const users = await userRepository.findAll();
        expect(users.length).to.equal(0);
    });

});