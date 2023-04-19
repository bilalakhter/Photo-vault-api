import express from 'express';
import type { Request, Response } from 'express';

import * as Imageservice from './image.service';

export const imageRouter = express.Router();

imageRouter.get('/', async (request: Request, response: Response) => {
  try {
    const files = await Imageservice.listFiles();
    return response.status(200).json(files);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
