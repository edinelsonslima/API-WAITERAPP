import {Request, Response} from 'express';
import { Order } from '../../models/Order';

export async function changeOrderStatus(req:Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if(!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status))
      return res.status(400).json({error: 'Status should be WAITING, IN_PRODUCTION or DONE'});

    const orderWithStatusUpdated =  await Order.findByIdAndUpdate(orderId, { status });

    return res.status(204).json(orderWithStatusUpdated);

  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Error change status order'});
  }
}
