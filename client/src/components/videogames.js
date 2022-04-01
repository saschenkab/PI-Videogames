import React from "react";
import { useSelector } from "react-redux";
import Cards from "./cards";
import Paginate from "./paginate";

const Videogames = ({ items, gamesPerPage, setCurrentPage }) => {
  const videogames = useSelector((state) => state.videogames);
  const videogamesFilter = useSelector((state) => state.videogamesFilter);

  let allGames = [];
  if (videogamesFilter.length) {
    allGames = videogamesFilter;
  } else {
    allGames = videogames;
  }

  return (
    <>
      <Cards videogames={items} />
      {items.length > 0 && (
        <Paginate
          setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
          totalGames={allGames.length}
          gamesPerPage={gamesPerPage}
        />
      )}
    </>
  );
};

export default Videogames;
