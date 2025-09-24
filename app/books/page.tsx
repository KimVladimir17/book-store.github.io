import Link from "next/link";
import Loading from "../../components/loading";
import { BooksResponse } from "@/types";
import Pagination from "@/components/Pagination";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BooksPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const numberPage = Number(page) || 1;

  const res = await fetch(
    `http://localhost:3000/api/books?page=${numberPage}&limit=5`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) return <Loading />;

  const { data: books, totalPages }: BooksResponse = await res.json();

  return (
    <div className="container">
      <div className="book-blog">
        <h1>📚 Books — page {numberPage}</h1>
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id}>
              <Link href={`/books/${book.id}`}>
                <h4>{book.title}</h4>
              </Link>
            </li>
          ))}
        </ul>
        <div className="book-btn">
          <Link href={"/"}>Back to Home page</Link>
          <Link href={`/books/new`}>Add book</Link>
        </div>
        {books.length !== 0 && (
          <Pagination
            currentPage={numberPage}
            totalPages={totalPages}
            basePath="/books"
          />
        )}
      </div>
    </div>
  );
}
