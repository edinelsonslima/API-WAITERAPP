import {Request, Response} from 'express';
import { Product } from '../../models/Product';

export async function listProductsByCategories(req:Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const products = await Product.find().where('category').equals(categoryId);
    return res.status(200).json(products);

  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Error listing products'});
  }
}
