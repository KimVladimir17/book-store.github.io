"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/types";
import Link from "next/link";
import Loading from "../components/loading";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetch(`/api/books?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.data);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  if (!books) return <Loading />;

  return (
    <div className="container">
      <div className="book-blog">
        <h1>📚 Книги — страница {page}</h1>
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
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`pagination-btn ${page === 1 ? "disabled" : ""}`}
          >
            ←
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`numPage ${page === pageNumber ? "active" : ""}`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`pagination-btn ${
              page === totalPages ? "disabled" : ""
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
