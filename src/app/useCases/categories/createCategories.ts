import {Request, Response} from 'express';
import { Category } from '../../models/Category';

export async function createCategories(req:Request, res: Response) {
  try {
    const {icon, name} = req.body;

    const category = await Category.create({icon, name});
    return res.status(201).json(category);

  } catch (err){
    console.error(err);
    return res.status(500).json({error: 'Error creating category'});
  }
}
