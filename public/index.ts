import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserController } from "./controllers/userController";
import { ProductController } from "./controllers/productController";
import * as swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import * as path from "path";
import authRoutes from './routes/authRoutes';
import { authenticate } from './middlewares/authMiddleware';
import { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();
const productController = new ProductController();
const userController = new UserController();
app.use(express.json());

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "../swagger.json"), "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.get('/protected', authenticate, (req:Request, res:Response) => {
    res.status(200).json({ message: 'You have access to this protected route' });
})



app.post("/product", async (req:Request, res:Response) => {
    try {

        const product = await productController.createProduct(req, res);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message })
    }
})

app.get("/product", async (req:Request, res:Response) => {
    try {

        const product = await productController.getAllProducts(req, res);
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message })
    }
})

app.get("/product/:id", async (req:Request, res:Response) => {
    try {

        const product = await productController.getProductById(req, res);
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message })
    }
})

app.put("/product/:id", async (req:Request, res:Response) => {
    try {

        const product = await productController.updateProduct(req, res);
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao atualizar o produto", error: error.message })
    }
})

app.delete("/product/:id", async (req:Request, res:Response) => {
    try {

        const product = await productController.delete(req, res);
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao deletar o produto", error: error.message })
    }
})

app.post("/user", async (req:Request, res:Response) => {
    try {

        const user = await userController.createUser(req, res);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o produto", error: error.message })
    }
})
app.get("/user", async (req:Request, res:Response) => {
    try {

        const user = await userController.getAllUser(req, res);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o usuario", error: error.message })
    }
})

app.get("/user/:id", async (req:Request, res:Response) => {
    try {

        const user = await userController.getUserById(req, res);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o usuario", error: error.message })
    }
})

app.put("/user/:id", async (req:Request, res:Response) => {
    try {

        const user = await userController.updateUser(req, res);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao atualizar o usuario", error: error.message })
    }
})

app.delete("/user/:id", async (req:Request, res:Response) => {
    try {

        const user = await userController.delete(req, res);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao deletar o usuario", error: error.message })
    }
})
//middleware globalde erro para capturar do next na const authenticate
/*app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Middleware de erro:", err.message);
    res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});*/

// Testando a conexão e inicializando o servidor
sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});


