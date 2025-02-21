import Batch from "../models/batch";
import {Product} from "../models/product";
import ProductRepository from "../repository/productRepository";

export class ProductService {
    
    async createProduct(name: string, price: number) {
      
      return await ProductRepository.create({ name, price });
    }
  
    async getAllProducts() {
      return await ProductRepository.findAll();
    }
  
    async getProductById(id: number) {
      return await ProductRepository.findById(id);
    }
  
    async updateProduct(id: number, updatedData: { name?: string; price?: number }) {
      return await ProductRepository.update(id, updatedData);
    }
  
    async deleteProduct(id: number) {
      return await ProductRepository.delete(id);
    }
  }
  
  export default new ProductService();