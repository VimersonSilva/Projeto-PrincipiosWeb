
import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserController } from "./controllers/userController";
import { ProductController } from "./controllers/productController";
import * as swaggerUi from "swagger-ui-express";
import * as fs from "fs";
import * as path from "path";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import { authenticate } from './middlewares/authMiddleware';
import { Request, Response, NextFunction } from "express";
import routes from './routes/routes';

dotenv.config();

const app = express();
const productController = new ProductController();
const userController = new UserController();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "../swagger.json"), "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);


app.use('/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);       

app.get('/api', (req, res) => {         
    res.json({ message: "API funcionando!" });
});
app.get('/protected', authenticate, (req:Request, res:Response) => {
    res.status(200).json({ message: 'You have access to this protected route' });
})

// Testando a conexão e inicializando o servidor
sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});


