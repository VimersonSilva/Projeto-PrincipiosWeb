import { UserService } from './services/userService';
import { ProductService } from './services/productService';
import { User } from './models/user';
import { Product } from './models/product';

const userService = new UserService();
const productService = new ProductService();

//const user1 = new User("João");
const product1 = new Product(1, "Camiseta", 49.90, 100);

//userService.addUser(user1);
productService.addProduct(product1);

console.log(userService.getUserById(1));
console.log(productService.getProductById(1));

userService.updateUser(1, { name: "João da Silva", email: "silva@gmail.com" });
productService.updateProduct(1, { name: "Camiseta", price: 39.90, stock: 50 });

userService.removeUserById(1);
productService.removeProductById(1);