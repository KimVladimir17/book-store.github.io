import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <main className="main">
        <h1>📚 Welcome to the library</h1>
        <Link className="main-link" href={`/books`}>
          Go to see the list of books with pagination.
        </Link>
      </main>
    </div>
  );
}
