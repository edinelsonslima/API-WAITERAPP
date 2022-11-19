import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import { Server } from 'socket.io';

import { router } from './router';


if(!process.env.NODE_MONGODB_URI)
  throw new Error('NODE_MONGODB_URI is not defined');

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(process.env.NODE_MONGODB_URI)
  .then(() => {
    const port = 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen( port, () => {
      return console.log(`🚀 Server is running on http://localhost:${port}`);
    });

  })
  .catch((err) => console.log('Error connecting to MongoDB', err));

