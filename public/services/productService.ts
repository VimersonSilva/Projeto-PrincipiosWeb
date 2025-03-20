import { Product } from '../models/product';
import {ProductRepository} from '../repository/productRepository'
export class ProductService {
    productsRepository: ProductRepository;

    constructor(productsRepository?: ProductRepository) {
        this.productsRepository = productsRepository || new ProductRepository();
    }
    createProduct(name: string, price: number, stock: number) {
      const product = { id: Date.now(), name, price, stock };
      const productReturn = this.productsRepository.create(product);

      return productReturn;
  }

    //addProduct(product: Product): void {
    //    this.products.push(product);
    //    console.log("Produto cadastrado: ", product);
    //}

    getProductById(id: number): Promise<Product | null>  {
        const product = this.productsRepository.findById(id);
        return product;
    }

    getAllProducts(): Promise<Product[]> {
      const products = this.productsRepository.findAll();
      return products;
    }

    updateProduct(id: number, newData: Partial<Product>): Promise<Product | null> | string {
        const product = this.productsRepository.update(id, newData);
        if (!product) {
            return "Produto não encontrado.";
        }
        
        return product;
    }

    removeProductById(id: number):Promise<null | {message:string}> {
        const product = this.productsRepository.delete(id);
        return product;

    }
}