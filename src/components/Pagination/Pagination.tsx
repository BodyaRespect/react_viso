import React from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      )}

      {pages.slice(0, 7).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}

      {totalPages > 10 && currentPage < totalPages - 3 && (
        <>
          <span>…</span>
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};
