import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import type { Book } from "@/types";

const filePath = path.join(process.cwd(), "data", "books.json");

async function readBooks(): Promise<Book[]> {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.error("Error reading or parsing books file:", error);
    throw new Error("Failed to read books data.");
  }
}

async function writeBooks(books: Book[]) {
  await fs.writeFile(filePath, JSON.stringify(books, null, 2), "utf-8");
}

// GET
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const books = await readBooks();
    const start = (page - 1) * limit;
    const paginated = books.slice(start, start + limit);

    return NextResponse.json({
      page,
      limit,
      total: books.length,
      totalPages: Math.ceil(books.length / limit),
      data: paginated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка сервера ${error}` },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.author) {
      return NextResponse.json(
        { error: "Missing title or author" },
        { status: 400 }
      );
    }
    const books = await readBooks();

    const isDuplicate = books.some(
      (book) => book.title.toLowerCase() === body.title.toLowerCase()
    );
    if (isDuplicate) {
      return NextResponse.json(
        { error: `Book with that name already exists.` },
        { status: 500 }
      );
    }
    const newBook: Book = {
      id: Date.now().toString(),
      title: body.title,
      author: body.author,
      description: body.description,
    };

    books.unshift(newBook);
    await writeBooks(books);

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка сервера ${error}` },
      { status: 500 }
    );
  }
}
