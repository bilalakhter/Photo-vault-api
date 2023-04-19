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

// create file
imageRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { title, tag, image } = request.body;
    const createdFile = await Imageservice.createFile({ title, tag, image });
    return response.status(201).json(createdFile);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// update file
imageRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { title, tag, image } = request.body;
    const updatedFile = await Imageservice.updateFile(Number(id), { title, tag, image });
    return response.status(200).json(updatedFile);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// get specific file by ID
imageRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const file = await Imageservice.getFileById(Number(id));
    if (!file) {
      return response.status(404).json({ message: 'File not found' });
    }
    return response.status(200).json(file);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

imageRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id, 10);
    await Imageservice.deleteFileById(id);
    return response.sendStatus(204);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
