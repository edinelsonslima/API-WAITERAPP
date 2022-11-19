import {Request, Response} from 'express';
import { Order } from '../../models/Order';

export async function cancelOrders(req:Request, res: Response) {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    return res.status(204).json(deletedOrder);

  } catch (err){
    console.error(err);
    return res.status(500).json({error: 'Error cancel order'});
  }
}
