import { Request, Response } from 'express';
import { Order} from '../models/order'
import { OrderItem} from '../models/orderItems'
import  {Carrinho} from '../models/carrinho'
import {Batch} from '../models/batch'
import { Product} from '../models/product'
import {User } from  '../models/user';
import sequelize  from '../config/database';


export class OrderController {
  /**
   * Cria um novo pedido a partir do carrinho
   */
  async createOrder(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const { paymentMethod, shippingAddress } = req.body;
      const userId = req.user!.id;

      // 1. Busca o carrinho do usuário com itens
      const cart = await Carrinho.findOne({
        where: { userId },
        include: [
          {
            model: Batch,
            include: [Product]
          }
        ],
        transaction
      });

      if (!cart || cart.Batchs.length === 0) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Carrinho vazio' });
      }

      // 2. Verifica estoque e calcula total
      let total = 0;
      for (const item of cart.Batchs) {
        if (item.quantity > item.Product.stock) {
          await transaction.rollback();
          return res.status(400).json({ 
            error: `Estoque insuficiente para ${item.Product.name}`,
            productId: item.productId,
            available: item.Product.stock
          });
        }
        total += item.quantity * item.Product.price;
      }

      // 3. Cria o pedido
      const order = await Order.create({
        userId,
        total,
        status: 'pending',
        paymentMethod,
        shippingAddress,
        transaction
      });

      // 4. Cria os itens do pedido e atualiza estoque
      const orderItems = await Promise.all(
        cart.Batchs.map(async (item) => {
          const orderItem = await OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.Product.price,
            transaction
          });

          // Atualiza estoque
          await Product.decrement('stock', {
            by: item.quantity,
            where: { id: item.productId },
            transaction
          });

          return orderItem;
        })
      );

      // 5. Limpa o carrinho
      await Batch.destroy({
        where: { cartId: cart.id },
        transaction
      });

      await transaction.commit();

      // 6. Retorna o pedido criado
      const createdOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            include: [Product]
          },
          User
        ]
      });

      res.status(201).json(createdOrder);

    } catch (error) {
      await transaction.rollback();
      console.error('Order creation error:', error);
      res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  }

  /**
   * Lista os pedidos do usuário atual
   */
  async getUserOrders(req: Request, res: Response) {
    try {
      const orders = await Order.findAll({
        where: { userId: req.user!.id },
        include: [
          {
            model: OrderItem,
            include: [Product]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(orders);
    } catch (error) {
      console.error('Get user orders error:', error);
      res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }

  /**
   * Obtém detalhes de um pedido específico
   */
  async getOrderDetails(req: Request, res: Response) {
    try {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
          userId: req.user!.id
        },
        include: [
          {
            model: OrderItem,
            include: [Product]
          }
        ]
      });

      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.json(order);
    } catch (error) {
      console.error('Get order details error:', error);
      res.status(500).json({ error: 'Erro ao buscar pedido' });
    }
  }

  /**
   * Cancela um pedido (se ainda estiver pendente)
   */
  async cancelOrder(req: Request, res: Response) {
    const transaction = await sequelize.transaction();

    try {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
          userId: req.user!.id,
          status: 'pending'
        },
        include: [OrderItem],
        transaction
      });

      if (!order) {
        await transaction.rollback();
        return res.status(404).json({ 
          error: 'Pedido não encontrado ou não pode ser cancelado' 
        });
      }

      // Devolve os itens ao estoque
      await Promise.all(
        order.OrderItems.map(async (item) => {
          await Product.increment('stock', {
            by: item.quantity,
            where: { id: item.productId },
            transaction
          });
        })
      );

      // Atualiza status do pedido
      await order.update({ status: 'cancelled' }, { transaction });

      await transaction.commit();

      res.json(order);
    } catch (error) {
      await transaction.rollback();
      console.error('Cancel order error:', error);
      res.status(500).json({ error: 'Erro ao cancelar pedido' });
    }
  }

  /**
   * Lista todos os pedidos (apenas admin)
   */
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [Product]
          },
          User
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json(orders);
    } catch (error) {
      console.error('Get all orders error:', error);
      res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }

  /**
   * Atualiza o status de um pedido (apenas admin)
   */
  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const validStatus = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

      if (!validStatus.includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
      }

      const [updated] = await Order.update(
        { status },
        { where: { id: req.params.id } }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      const updatedOrder = await Order.findByPk(req.params.id);
      res.json(updatedOrder);
    } catch (error) {
      console.error('Update order status error:', error);
      res.status(500).json({ error: 'Erro ao atualizar status' });
    }
  }
}