import React, { useState } from "react";
import { getDetail } from "../redux/actions";
import { useDispatch } from "react-redux";
import "./searchbar.css";

const Searchbar = ({ setFilter }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getDetail(value));
    setFilter(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    dispatch(getDetail(""));
    setValue("");
    setFilter(false);
  };

  return (
    <div className="navigation-bar">
      <form>
        <input
          type="text"
          name="search"
          className="searchbar"
          value={value}
          onChange={handleChange}
        />
        <div onClick={(event) => handleSubmit(event)} className="search-btn">
          Search
        </div>
      </form>
      <div className="reset-btn" onClick={resetValue}>
        Reset
      </div>
    </div>
  );
};

export default Searchbar;
