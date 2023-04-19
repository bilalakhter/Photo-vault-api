import { db } from "./db.server";
type FileRead = {
  id: number;
  title: string;
  tag: string;
  image: string;
};

type FileWrite = {
  title: string;
  tag: string;
  image: Buffer;
};


export const listFiles = async (): Promise<FileRead[]> => {
  return db.file.findMany({
    select: {
      id: true,
      title: true,
      tag: true,
      image: true,
    },
  });
};

export const getFileById = async (id: number): Promise<FileRead> => {
  const file = await db.file.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      tag: true,
      image: true,
    },
  });

  if (!file) {
    throw new Error("File not found");
  }

  return file;
};

export const createFile = async (file: FileWrite): Promise<FileRead> => {
  const encodedImage = file.image.toString("base64");
  const createdFile = await db.file.create({
    data: {
      title: file.title,
      tag: file.tag,
      image: encodedImage,
    },
    select: {
      id: true,
      title: true,
      tag: true,
      image: true,
    },
  });

  return createdFile;
};




export const updateFile = async (id: number, data: FileWrite): Promise<FileRead | null> => {
  const file = await db.file.update({
    where: { id },
    data: {
      title: data.title,
      tag: data.tag,
      image: data.image.toString("base64"), // Convert Buffer to base64 string
    },
    select: {
      id: true,
      title: true,
      tag: true,
      image: true,
    },
  });

  if (!file) {
    return null;
  }

  return {
    id: file.id,
    title: file.title,
    tag: file.tag,
    image: file.image,
  };
};

export const deleteFileById = async (id: number): Promise<boolean> => {
  const file = await db.file.delete({
    where: {
      id,
    },
  });

  if (file === null) {
    throw new Error("File not found");
  }

  return true;
};
