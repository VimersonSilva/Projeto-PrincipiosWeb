import { Product } from '../models/product';

export class ProductService {
    products: Product[];

    constructor() {
        this.products = [];
    }

    addProduct(product: Product): void {
        this.products.push(product);
        console.log("Produto cadastrado: ", product);
    }

    getProductById(id: number): Product | string {
        return this.products.find(product => product.id === id) || "Produto não encontrado";
    }

    updateProduct(id: number, newData: Partial<Product>): void {
        const product = this.getProductById(id);
        if (typeof product === 'string') {
            console.log("Produto não encontrado");
            return;
        }
        product.name = newData.name || product.name;
        product.price = newData.price || product.price;
        product.stock = newData.stock || product.stock;
        console.log("Produto atualizado: ", product);
    }

    removeProductById(id: number): void {
        this.products = this.products.filter(product => product.id !== id);
        console.log("Produto removido: ", id);
    }
}
