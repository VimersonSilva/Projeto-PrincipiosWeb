import {Request, Response} from "express";
import { ProductService } from '../services/productService';

export class ProductController{
    static createProduct(name: string, price: number) {
      throw new Error("Method not implemented.");
    }
    productService: ProductService;

    constructor(){
        this.productService = new ProductService();
    }

    async createProduct(req: Request, res: Response){
        try{
            const {name, price, stock} = req.body;
            const product = await this.productService.createProduct(name, price, stock);
            return res.status(201).json(product);
        } catch( error:any){
            return res.status(400).json({error: error.message});
        }
    }
    //async addProduct(req: Request, res: Response){
    //    try{
    //        const product = req.body;
    //        this.productService.addProduct(product);
    //        return res.status(201).json(product);
    //    } catch(error: any){
    //        return res.status(400).json({error: error.message});
    //    }
    //}      


    async getAllProducts(req:Request, res:Response){
        const products = this.productService.getAllProducts();
        return res.json(products);
    }

    async getProductById(req:Request, res:Response){
        try{
            const product = await this.productService.getProductById(Number(req.params.id));
            if(!product){
                return res.status(404).json({error: "Produto não encontrado"});
            }
            return res.json(product);
        } catch(error:any){
            return res.status(400).json({error: error.message});
        }
    }

    async updateProduct(req: Request, res:Response) {
        try{
            const product = await this.productService.updateProduct(Number(req.params.id), req.body);
            if(product === null ||typeof product === 'string') return res.status(404).json({error: "Produto não encontrado"});

            return res.json(product);
        } catch (error: any){
            return  res.status(400).json({error: error.message});
        }
    }

    async delete(req: Request, res: Response){
        try{
            const result = await this.productService.removeProductById(Number(req.params.id));

            return res.status(203).json({message: "Produto removido com sucesso"});
        } catch (error: any){
            return res.status(400).json({error: error.message});
        }
    }
}

