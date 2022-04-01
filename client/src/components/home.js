import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getGenre,
  getVideogames,
  orderByName,
  orderByRating,
  filterByGenre,
  filterByOrigin,
} from "../redux/actions";
import Searchbar from "./searchbar";
import "./home.css";
import Videogames from "./videogames";

const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const videogamesFilter = useSelector((state) => state.videogamesFilter);
  const genre = useSelector((state) => state.genre);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const gamesPerPage = 15;
  const lastIndex = gamesPerPage * currentPage;
  const firstIndex = lastIndex - gamesPerPage;

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenre());
  }, [dispatch]);

  const handleOrderByName = (e, string) => {
    dispatch(orderByName(string));
  };

  const handleOrderByRating = (e, string) => {
    dispatch(orderByRating(string));
  };

  const handleChangeGenre = (e) => {
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setIsFiltered(true);
  };

  const handleChangeOrigin = (e) => {
    dispatch(filterByOrigin(e.target.value));
    setIsFiltered(true);
  };

  const validateCards = () => {
    const videogamesCopy = videogamesFilter.length
      ? videogamesFilter
      : videogames;

    if (isFiltered && videogamesFilter.length === 0) {
      return <span className="spanError">Game Not Found</span>;
    }

    return (
      <Videogames
        items={videogamesCopy.slice(firstIndex, lastIndex)}
        setCurrentPage={setCurrentPage}
        gamesPerPage={gamesPerPage}
      />
    );
  };

  return (
    <div className="background-home">
      <div className="filtros">
        <Searchbar setFilter={setIsFiltered} />
        <div className="filtro">
          <span>Order By Name:</span>
          <button
            className="btn"
            onClick={(e) => handleOrderByName(e, "ascendent")}
          >
            Asc
          </button>
          <button
            className="btn"
            onClick={(e) => handleOrderByName(e, "descendent")}
          >
            Dsc
          </button>
        </div>
        <div className="filtro">
          <span>Order By Rating:</span>
          <button
            className="btn"
            onClick={(e) => handleOrderByRating(e, "ascendent")}
          >
            Asc
          </button>
          <button
            className="btn"
            onClick={(e) => handleOrderByRating(e, "descendent")}
          >
            Dsc
          </button>
        </div>
        <div className="filtro">
          <span>Filter By Genre:</span>
          <select className="select" onChange={(e) => handleChangeGenre(e)}>
            <option value="All Games">All Games</option>
            {genre.map((g) => (
              <option key={g[0].id} value={g[0].name}>
                {g[0].name}
              </option>
            ))}
          </select>
        </div>
        <div className="filtro">
          <span>Filter By Origin:</span>
          <select className="select" onChange={(e) => handleChangeOrigin(e)}>
            <option value="All">All</option>
            <option value="Api">Api</option>
            <option value="DataBase">DataBase</option>
          </select>
        </div>
        <Link to="/form" className="link">
          <button className="crearJuego">Create Videogame</button>
        </Link>
      </div>
      <div className="content">{validateCards()}</div>
    </div>
  );
};

export default Home;
