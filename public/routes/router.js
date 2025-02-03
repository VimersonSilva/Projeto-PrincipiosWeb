const UserController = require("../controller/UserController/UserController");
const {Router} = require("express");

const routes = Router();

routes.post("/users", UserController.createUser);
routes.get("/users", UserController.getUsers);

/*
routes.post("/users", (req, res) => {


});*/
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

module.exports = routes;