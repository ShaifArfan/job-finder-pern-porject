import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../db';

export const getMultipleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      skip: Number(req.params.offset) || 0,
      take: Number(req.params.limit) || 10,
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(404).json({ message: error.message });
    }
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id)
    return res.status(404).json({ message: 'user not found' });
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
};
