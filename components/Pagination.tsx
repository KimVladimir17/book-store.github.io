import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <div className="pagination">
      <Link
        href={`${basePath}?page=${prevPage}`}
        className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
      >
        ←
      </Link>
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1;
        const isActive = pageNumber === currentPage;
        return (
          <Link
            href={`${basePath}?page=${pageNumber}`}
            key={pageNumber}
            className={`numPage ${isActive ? "active" : ""}`}
          >
            {pageNumber}
          </Link>
        );
      })}
      <Link
        href={`${basePath}?page=${nextPage}`}
        className={`pagination-btn ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        →
      </Link>
    </div>
  );
}
