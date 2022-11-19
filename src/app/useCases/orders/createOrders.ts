import {Request, Response} from 'express';
import { io } from '../../..';
import { Order } from '../../models/Order';

export async function createOrders(req:Request, res: Response) {
  try {
    const { table, products } = req.body;

    const order = await Order.create({ table, products });
    const orderDetails = await order.populate('products.product');

    io.emit('orders@new', orderDetails);

    return res.status(201).json(order);

  } catch (err){
    console.error(err);
    return res.status(500).json({error: 'Error creating order'});
  }
}
