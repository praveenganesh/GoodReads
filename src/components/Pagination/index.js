import React, { useState } from "react";
export default function Pagination(props) {
  const [totalPages, setTotalPages] = useState(props.totalPages);
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  let pages = [];

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }
    if (to < totalPages) {
      range.push(">>");
      range.push(totalPages);
    }
    if (currentPage > 5) {
      range.unshift("<<");
      range.unshift(1);
    }

    currentPage > 1 && range.unshift("Prev");
    currentPage < totalPages && range.push("Next");

    return range;
  };

  let startPage = Math.min(totalPages - 5, currentPage);
  if (startPage === 0) {
    startPage = currentPage;
  }
  let endPage = Math.min(currentPage + 5, totalPages);
  if (totalPages > 1) {
    pages = range(startPage, endPage);
  }

  const handlePageClick = (page) => {
    if (page === ">>") {
      page = currentPage + 5;
    } else if (page === "<<") {
      page = currentPage - 5;
    } else if (page === "Next") {
      page = currentPage + 1;
    } else if (page === "Prev") {
      page = currentPage - 1;
    }
    setCurrentPage(page);
    props.onChange(page);
  };

  return (
    <ul className="pagination-wrap">
      {pages.map((page, index) => {
        return (
          <li
            key={index}
            className={`pagination-btn ${
              page === currentPage && "current-page"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </li>
        );
      })}
    </ul>
  );
}
