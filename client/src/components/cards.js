import React from "react";
import Card from "./card";
import Loader from "./loader";
import "./cards.css";

const Cards = ({ videogames, span }) => {
  return (
    <>
      {span !== null && span}

      {Array.isArray(videogames) && videogames.length > 0 ? (
        <div className="cardsContainer">
          {videogames.map((game) => (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              img={game.img}
              genre={game.genre}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cards;
