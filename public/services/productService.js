export class ProductService{
    constructor(){
        this.products = [];
    }

    addProduct(product){
        this.products.push(product);
        console.log("Produto cadastrado: ", product);
    }

    getProductById(id){
        return this.products.find(product => product.id === id) || "Produto não encontrado";
    }

    updateProduct(id, newData){
        const product = this.getProductById(id);
        if(product === "Produto não encontrado"){
            console.log("Produto não encontrado");
            return;
        }
        product.name = newData.name;
        product.price = newData.price;
        product.stock = newData.stock;
        console.log("Produto atualizado: ", product);
    }

    removeProductById(id){
        this.products = this.products.filter(product => product.id !== id);
        console.log("Produto removido: ", id);
    }
}