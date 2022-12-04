import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import allRoutes from './routers';

import { PrismaClient } from '@prisma/client';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT;

app.use(morgan('tiny'));
app.use(express.json());

// routes
app.use('/api/v1', allRoutes);

app.get('/', async (req, res) => {
  // res.send('Hello World!');
  console.log(req.body);
  const test = await prisma.user.findMany();
  res.json(test);
});
app.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const test = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
      },
    });
    res.json(test);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(400).json({
          message: err.meta?.target,
        });
      }
      return;
    }
    if (err instanceof PrismaClientValidationError) {
      res.status(400).json({
        message: err.message,
      });
      return;
    }

    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
