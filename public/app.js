import UserService from './services/userService';
import ProductService from './services/productService';
import User from './models/user';
import Product from './models/product';
const UserService = new UserService();
const ProductService = new ProductService();

const user1 = new User(1, "João", "joao@gmail.com");
const product1 = new Product(1, "Camiseta", 49.90, 100);

UserService.addUser(user1);
productService.addProduct(product1);

console.log(UserService.getUserById(1));
console.log(ProductService.getProductById(1));

UserService.updateUser(1, {name: "João da Silva", email: "silva@gmail.com"});
ProductService.updateProduct(1, {name: "Camiseta", price: 39.90, stock: 50});

UserService.removeUserById(1);
ProductService.removeProductById(1);