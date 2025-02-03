const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const routes = require('./public/routes/router');

const db = require("./public/db");

const UserController = require("./public/controller/UserController/UserController");

require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello, World');
});

app.use(routes);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, 'public')));

//routes.post("/users", UserController.createUser);
//routes.get("/users", UserController.getUsers);
//routes.get("/users/:id", UserController.getUserById);
/*
routes.delete();
routes.put("/users/id");
routes.get("/users");

routes.get("/users/:user_id");

routes.post("/login");

routes.post("/products/:user_id");
routes.get("/products/:user_id");
routes.patch("/products/:user_id/:product_id");
routes.delete("/products/:user_id/:product_id");

routes.get("/products");
routes.get("/products/:product_id");

routes.post("/carrinho/:user_id");
routes.get("/carrinho/:user_id");

routes.get("/carrinho/:user_id/:carrinho_id");
*/
