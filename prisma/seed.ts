import { db } from "../src/db.server";
import fs from "fs";

type File = {
  title: string;
  tag: string;
  image: string;
};

async function seed() {
  const files: File[] = [
    {
      title: "File 1",
      tag: "Tag 1",
      image: fs.readFileSync("./src/images/tasveer.jpg").toString("base64"),
    },
  ];

  await Promise.all(
    files.map((file) => {
      const { title, tag, image: imageData } = file;
      return db.file.create({
        data: {
          title,
          tag,
          image: imageData,
        },
      });
    })
  );
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
