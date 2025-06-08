import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <main className="main">
        <h1>📚 Добро пожаловать в библиотеку</h1>
        <Link href={`/books`}>
          Перейдите , чтобы посмотреть список книг с пагинацией.
        </Link>
      </main>
    </div>
  );
}
