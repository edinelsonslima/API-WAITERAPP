import {Request, Response} from 'express';
import { Product } from '../../models/Product';

export async function createProducts(req:Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const {name, description, price, category, ingredients} = req.body;

    const product = await Product.create({
      name,
      category,
      imagePath,
      description,
      price: Number(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    return res.status(201).json(product);

  } catch (err){
    console.error(err);
    return res.status(500).json({error: 'Error creating product'});
  }
}
