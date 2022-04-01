import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ id, img, name, genre }) => {
  return (
    <>
      <Link className="card-link" to={`/detail/${id}`}>
        <div className="cardContainer">
          <div className="img-container">
            <img className="img" src={img} alt="" />
          </div>
          <h3 className="name">{name}</h3>
          <div className="genreContainer">
            {genre?.map(
              (game) =>
                game !== "role-playing-games-rpg" && (
                  <span className="genre" key={game}>
                    {game}
                  </span>
                )
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
