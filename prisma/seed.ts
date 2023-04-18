import { db } from "../src/db.server";

type Book = {
    title: String;
    author: String;
}

async function seed() {
    await Promise.all(
        getBooks().map((Book) => {
            const { title, author } = Book;
            return db.Book.create({
                data: {
                    title,
                    author
                },
            })
        })
    )
}

seed();

function getBooks(): Array<Book> {
    return [
       {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
        },
        {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger"
        }
    ]
}