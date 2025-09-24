import { notFound } from "next/navigation";
import type { Book } from "@/types"; // если используешь типы
import Link from "next/link";

type Params = {
  id: string;
};

export default async function BookPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const res = await fetch(`https://book-store-github-io-omega.vercel.app/api/books/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  const book: Book = await res.json();

  return (
    <div className="container">
      <div className="book-info">
        <h1>📕 Book: {book.title}</h1>
        <p>👤 Author: {book.author}</p>
        <p className="book-description">📖 Description: {book.description}</p>
        <Link href={"/books"}>← Back</Link>
      </div>
    </div>
  );
}
