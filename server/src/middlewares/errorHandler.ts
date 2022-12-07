import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ error });
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        res
          .status(409)
          .json({ message: 'Item already exist', target: error.meta?.target });
        break;
      case 'P2025':
        res.status(404).json({ message: 'Missing data' });
        break;
      default:
        res.status(500).json({ message: 'Internal server error' });
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({ message: 'Invalid data' });
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(404).json({ message: 'test' });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
  next();
};
