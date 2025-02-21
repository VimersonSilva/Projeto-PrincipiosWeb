import * as express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserController } from "./controllers/userController";
import { ProductController } from "./controllers/productController";
dotenv.config();

const app = express();
const productController = new ProductController();
const userController = new UserController();
app.use(express.json());


app.post("/product", async (req, res) =>{
    try {
        
        const product = await productController.createProduct(req,res);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao criar o produto", error: error.message})
    }
})

app.get("/product", async (req, res) =>{
    try {
        
        const product = await productController.getAllProducts(req, res);
        res.json(product);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao criar o produto", error: error.message})
    }
})

app.get("/product/:id", async (req, res) =>{
    try {
        
        const product = await productController.getProductById(req, res);
        res.json(product);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao criar o produto", error: error.message})
    }
})

app.put("/product/:id", async (req, res) =>{
    try {
        
        const product = await productController.updateProduct(req, res);
        res.json(product);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao atualizar o produto", error: error.message})
    }
})

app.delete("/product/:id", async (req, res) =>{
    try {
        
        const product = await productController.delete(req, res);
        res.json(product);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao deletar o produto", error: error.message})
    }
})

app.post("/user", async (req, res) =>{
    try {
        
        const user = await userController.createUser(req,res);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao criar o produto", error: error.message})
    }
})
app.get("/user", async (req, res) =>{
    try {
        
        const user = await userController.getAllUser(req, res);
        res.json(user);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao criar o usuario", error: error.message})
    }
})

app.get("/user/:id", async (req, res) =>{
    try {
        
        const user = await userController.getUserById(req, res);
        res.json(user);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao criar o usuario", error: error.message})
    }
})

app.put("/user/:id", async (req, res) =>{
    try {
        
        const user = await userController.updateUser(req, res);
        res.json(user);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao atualizar o usuario", error: error.message})
    }
})

app.delete("/user/:id", async (req, res) =>{
    try {
        
        const user = await userController.delete(req, res);
        res.json(user);
    } catch(error: any) {
        res.status(500).json({message: "Erro ao deletar o usuario", error: error.message})
    }
})


// Testando a conexão e inicializando o servidor
sequelize.sync({ force: true }).then(() => {
console.log("Banco de dados conectado!");
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
console.error("Erro ao conectar ao banco de dados:", error);
});


