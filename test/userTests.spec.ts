import {expect} from "chai";
import {User} from '../public/models/user';

describe('Teste do user', () => {
    it("teste para ver se nome está correto", () => {
        const user = User.build({id:1,name:"Joao",email:"joao@gmail.com",password: "joao123456"});
        expect(user.name).to.equal('Joao');
    })
})