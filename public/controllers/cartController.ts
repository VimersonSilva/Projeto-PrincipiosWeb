import { Request, Response } from 'express';
import { Carrinho } from "../models/carrinho.ts";
import { Batch } from "../models/batch.ts" 
import { Product } from '../models/product.ts';

export class CartController {
  async getCart(req: Request, res: Response) {
    try {
      const cart = await Carrinho.findOne({
        where: { userId: req.user!.id },
        include: [
          {
            model: Batch,
            include: [Product]
          }
        ]
      });

      if (!cart) {
        const newCart = await Carrinho.create({ userId: req.user!.id });
        return res.json({ ...newCart.toJSON(), items: [] });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }

      const [cart] = await Carrinho.findOrCreate({
        where: { userId: req.user!.id }
      });

      const [item] = await Batch.findOrCreate({
        where: { cartId: cart.id, productId },
        defaults: { quantity }
      });

      if (!item.isNewRecord) {
        const newQuantity = item.quantity + quantity;
        if (newQuantity > product.stock) {
          return res.status(400).json({ error: 'Quantidade excede estoque' });
        }
        item.quantity = newQuantity;
        await item.save();
      }

      const updatedCart = await Batch.findByPk(cart.id, {
        include: [
          {
            model: Batch,
            include: [Product]
          }
        ]
      });

      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar item' });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const { quantity } = req.body;
      const { productId } = req.params;

      const batchItem = await Batch.findOne({
        where: { productId },
        include: [Product, {
          model: Carrinho,
          where: { userId: req.user!.id }
        }]
      });

      if (!batchItem) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }

      if (quantity > batchItem.Product.stock) {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }

      batchItem.quantity = quantity;
      await batchItem.save();

      res.json(batchItem);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar item' });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const cart = await Carrinho.findOne({ where: { userId: req.user!.id } });
      if (!cart) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      const deleted = await Batch.destroy({
        where: { cartId: cart.id, productId }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover item' });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const cart = await Carrinho.findOne({ where: { userId: req.user!.id } });
      if (!cart) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      await Batch.destroy({ where: { cartId: cart.id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao limpar carrinho' });
    }
  }
}