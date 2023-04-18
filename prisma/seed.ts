import { db } from "../src/db.server";

type Image = {
    title: String;
    tag: String;
}

async function seed() {
    await Promise.all(
        getImage().map((image) => {
            const { title, tag } = image;
            return db.image.create({
                data: {
                    title,
                    tag
                },
            })
        })
    )
}

seed();

function getImage(): Array<Image> {
    return [
      
    ]
}