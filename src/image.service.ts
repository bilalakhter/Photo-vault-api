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

