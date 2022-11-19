import {Request, Response} from 'express';
import { Order } from '../../models/Order';

export async function listOrders(req:Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate('products.product');

    return res.status(200).json(orders);

  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Error listing orders'});
  }
}
