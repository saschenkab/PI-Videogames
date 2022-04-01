import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailId, clearDetail } from "../redux/actions";
import "./gameDetail.css";
import Loader from "./loader";

const GameDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let navigate = useNavigate();

  const detail = useSelector((state) => state.gameDetail);
  let date = detail.date && detail.date.slice(0, 10);
  // console.log("🚀 ~ file: gameDetail.js ~ line 15 ~ GameDetail ~ date", date);

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
          <div className="info-container">
            <h1 className="game-info">{detail?.name}</h1>
            <h6 className="game-info">{detail?.id}</h6>
          </div>
          <div className="full-info-container">
            <h6 className="info-title">
              Rating
              <span className="full-info">{detail?.rating}</span>
            </h6>
            <h6 className="info-title">
              Released:
              <span className="full-info">{date}</span>
            </h6>
            <h6 className="info-title">
              Genres:
              <span className="full-info">
                {detail.genre?.map((word) => word + " ")}
              </span>
            </h6>
            <h6 className="info-title">
              platforms:
              <span className="full-info">
                {detail.platforms?.map((word) => word + " ")}
              </span>
            </h6>
            <div>
              <h6 className="info-title">
                Description:
                <span
                  className="full-info"
                  dangerouslySetInnerHTML={{ __html: detail?.description }}
                />
              </h6>
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
