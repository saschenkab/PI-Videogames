import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailId, clearDetail } from "../redux/actions";
import "./gameDetail.css";
import Loader from "./loader";

const GameDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [path, setPath] = [];
  let navigate = useNavigate();

  const detail = useSelector((state) => state.gameDetail);
  let date = detail.date && detail.date.slice(0, 10);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   try {
  //     navigate("/home", { replace: true });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(getDetailId(id));
    return () => dispatch(clearDetail());
  }, [dispatch, id]);
  console.log(detail);

  return (
    <div className="game-detail">
      <button onClick={() => navigate("/home")}>Back</button>
      {detail ? (
        <div className="container">
          <div className="img-container">
            <img className="img-detail" src={detail?.img} alt="game-banner" />
          </div>
          <div className="name">
            <h1>{detail?.name}</h1>
            <h6>{detail?.id}</h6>
          </div>
          <div>
            <span>Rating: {detail?.rating}</span>
            <span>Date: {date}</span>
            <span>Genres: {detail?.genre}</span>
            <span>Platforms: {detail?.platforms}</span>
            <div>
              <p
                className="description"
                dangerouslySetInnerHTML={{ __html: detail?.description }}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default GameDetail;
