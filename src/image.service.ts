import { db } from "./db.server";
type Imageread = {
    id: number;
    title: string;
    tag: string;
};

type Imagewrite = {
    title: string;
    tag: string;
};

export const listImages = async (): Promise <Imageread[]> => {
    return db.image.findMany({
        select: {
            id: true,
            title: true,
            tag: true
        }
})
}

export const filterImage = async (id: number): Promise<Imageread | null> => {
    return db.image.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            tag : true
        },
    })
}
            

export const createImage = async (image: Imagewrite): Promise<Imageread> => {
    const { title, tag } = image;
    return db.image.create({
        data: {
            title,
            tag
        },
    })
}

export const updateImage = async (image: Imagewrite, id : number): Promise<Imageread> => {
    const { title, tag } = image;
    return db.image.update({
        where: {
            id,
        },
        data: {
            title,
            tag
        }
    })
}

export const deleteImage = async (id: number): Promise<void> => {
    await db.image.delete({
        where: {
            id,
        },
    })
}