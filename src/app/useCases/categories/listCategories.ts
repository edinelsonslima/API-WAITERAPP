import {Request, Response} from 'express';
import { Category } from '../../models/Category';

export async function listCategories(req:Request, res: Response) {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);

  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Error listing categories'});
  }
}
