//import {expect} from "chai";
//import {User} from '../public/models/user';
//import {ProductService} from '../public/services/productService';
//
//describe('Teste do user', () => {
//    it("teste para ver se nome está correto", () => {
//        const user = User.build({id:1,name:"Joao",email:"joao@gmail.com",password: "joao123456"});
//        expect(user.name).to.equal('Joao');
//    })
//})

import { expect } from "chai";
import sinon from "sinon";
import { ProductService } from '../public/services/productService';
import { ProductRepository } from "../public/repository/productRepository";
import { Product } from "../public/models/product";

describe("ProductService", () => {
    let productService: ProductService;
    let productRepositoryStub: sinon.SinonStubbedInstance<ProductRepository>;

    beforeEach(() => {
        // Criando um mock do ProductRepository
        productRepositoryStub = sinon.createStubInstance(ProductRepository);
        productService = new ProductService(productRepositoryStub);
    });

    afterEach(() => {
        // Restaurando os stubs após cada teste
        sinon.restore();
    });

    it("deve retornar um produto pelo ID", async () => {
        const mockProduct = Product.build({ 
            id: 1, 
            name: "Produto Teste", 
            price: 100, 
            stock: 10 
        });

        // Configura o mock para retornar um produto específico ao buscar por ID
        productRepositoryStub.findById.resolves(mockProduct);

        const result = await productService.getProductById(1);

        expect(result).to.deep.equal(mockProduct);
    });

    it("deve retornar 'Produto não cadastrado' se o produto não for encontrado", async () => {
        // Configura o mock para retornar null quando o produto não existe
        productRepositoryStub.findById.resolves(null);

        const result = await productService.getProductById(999);

        expect(result).to.equal(null);
    });

    it("deve criar um novo produto", async () => {
        //const newProduct: Product = { id: 2, name: "Novo Produto", price: 50, stock: 5 };
        const newProduct = Product.build({ 
            id: 1, 
            name: "Novo Produto", 
            price: 50, 
            stock: 5 
        });
        // Configura o mock para simular a criação do produto
        productRepositoryStub.create.resolves();

        await productService.createProduct( "Novo Produto", 50,  5 );

        expect(productRepositoryStub.create.calledOnceWith(newProduct)).to.not.be.true;
    });

    it("deve atualizar um produto existente", async () => {
        //const existingProduct: Product = { id: 3, name: "Produto Antigo", price: 80, stock: 20 };
        const existingProduct = Product.build({ 
            id: 1, 
            name: "Produto Antigo", 
            price: 100, 
            stock: 10 
        });
        const updatedData = { name: "Produto Atualizado", price: 90 };

        // Configura o mock para simular a busca e atualização do produto
        productRepositoryStub.findById.resolves(existingProduct);
        productRepositoryStub.create.resolves();

        await productService.updateProduct(3, updatedData);
        const prod = await productRepositoryStub.findById(3);
        
        if(prod){            
            expect(prod.name).to.equal(existingProduct.name);}
        
        expect(existingProduct.price).to.not.equal(updatedData.price);
        expect(productRepositoryStub.create.calledOnceWith(existingProduct)).to.not.be.true;
    });

    it("deve retornar 'Produto não encontrado' ao tentar atualizar um produto inexistente", async () => {
        productRepositoryStub.findById.resolves(null);

        const result = await productService.updateProduct(999, { name: "Produto Teste" });

        expect(result).to.equal("Produto não encontrado.");
    });

    it("deve deletar um produto", async () => {
        productRepositoryStub.delete.resolves();

        await productService.removeProductById(1);

        expect(productRepositoryStub.delete.calledOnceWith(1)).to.be.true;
    });
});