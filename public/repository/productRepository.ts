import {Product} from "../models/product";

class ProductRepository {
  // 🔹 Criar um novo produto
  async create(data: { name: string; price: number }) {
    return await Product.create(data);
  }

  // 🔹 Buscar todos os produtos
  async findAll() {
    return await Product.findAll();
  }

  // 🔹 Buscar um produto por ID
  async findById(id: number) {
    return await Product.findByPk(id);
  }

  // 🔹 Atualizar um produto
  async update(id: number, updatedData: { name?: string; price?: number }) {
    const product = await Product.findByPk(id);
    if (!product) return null;

    return await product.update(updatedData);
  }

  // 🔹 Excluir um produto
  async delete(id: number) {
    const product = await Product.findByPk(id);
    if (!product) return null;

    await product.destroy();
    return { message: "Produto removido com sucesso" };
  }
}

export default new ProductRepository();