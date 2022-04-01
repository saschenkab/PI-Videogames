import React from "react";
import "./pages.css";

const Paginate = ({ setCurrentPage, totalGames, gamesPerPage }) => {
  let pageNumber = [];
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  for (let i = 0; i < totalPages; i++) {
    pageNumber.push(i + 1);
  }

  return (
    <ul className="pages-container">
      {pageNumber.map((page) => (
        <li key={page} className="li-pages">
          <button className="btn-pages" onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Paginate;
