import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import type { Book } from "@/types";

const filePath = path.join(process.cwd(), "data", "books.json");

async function readBooks(): Promise<Book[]> {
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

// GET /api/books/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const books = await readBooks();
  const book = books.find((b) => b.id === id);
  return book
    ? NextResponse.json(book)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
