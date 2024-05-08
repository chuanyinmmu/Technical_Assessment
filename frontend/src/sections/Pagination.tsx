import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div>
      {`${currentPage * itemsPerPage - itemsPerPage + 1}–${currentPage * itemsPerPage} of ${totalItems}`}
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} style={{ padding: "10px", margin: "0 5px" }}>{`First`}</button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ padding: "10px", margin: "0 5px" }}>{`<`}</button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={{ display: currentPage - 2 > page || currentPage + 2 < page ? "none" : "", backgroundColor: page === currentPage ? "red" : "", padding: "10px", margin: "0 5px" }}
        >
          {page}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: "10px", marginLeft: "5px" }}>{`>`}</button>
      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} style={{ padding: "10px", margin: "0 5px" }}>{`Last`}</button>
    </div>
  );
};

export default Pagination;
