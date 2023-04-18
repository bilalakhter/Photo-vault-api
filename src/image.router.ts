import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as Imageservice from './image.service';

export const imageRouter = express.Router();


imageRouter.get('/', async (request: Request, response: Response) => {
    try {
        const images = await Imageservice.listImages();
        return response.status(200).json(images);
} catch (error: any) {
    return response.status(500).json(error.message);
}
}    
) 



imageRouter.get('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const image = await Imageservice.filterImage(id);
        if (image) {
            return response.status(200).json(image);
        }
       
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

//unknown

imageRouter.post('/', body('title').isString(), body('tag').isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const image = request.body;
        const newImage = await Imageservice.createImage(image);
        return response.status(201).json(newImage);
    }
    catch(error: any) {
        return response.status(500).json(error.message);
    }
})

imageRouter.put('/:id', body('title').isString(), body('tag').isString(), async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const image = request.body;
        const updatedImage = await Imageservice.updateImage(image,id);
        return response.status(201).json(updatedImage);
    }
    catch(error: any) {
        return response.status(500).json(error.message);
    }
})


imageRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        await Imageservice.deleteImage(id);
        return response.status(204).json("Image deleted")
    }
    catch (error: any) {
        return response.status(500).json(error.message);
    }

})