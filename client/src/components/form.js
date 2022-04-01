import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./form.css";
import { getGenre, getPlatforms } from "../redux/actions";
import axios from "axios";

const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genre);
  const platforms = useSelector((state) => state.platforms);
  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
    rating: 0,
    platforms: [],
    genre: [],
  });

  useEffect(() => {
    dispatch(getGenre());
    dispatch(getPlatforms());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post(`http://localhost:3001/videogame`, values);
    if (res.status === 200) {
      setValues({
        name: "",
        description: "",
        date: "",
        rating: 0,
        platforms: [],
        genre: [],
      });

      alert("Videogame created!");
    } else {
      alert("Error, videogame not created. Try again.");
    }
  };

  const handleChangeGenreCheckboxes = (event) => {
    const { checked, name } = event.target;

    let checkedGenres = [];
    if (checked) {
      checkedGenres = [...values.genre, name];
    } else {
      checkedGenres = [...values.genre].filter((genre) => genre !== name);
    }

    setValues({
      ...values,
      genre: checkedGenres,
    });
  };

  const handleChangePlatformCheckboxes = (event) => {
    const { checked, name } = event.target;

    let checkedPlatforms = [];
    if (checked) {
      checkedPlatforms = [...values.platforms, name];
    } else {
      checkedPlatforms = [...values.platforms].filter(
        (platforms) => platforms !== name
      );
    }

    setValues({
      ...values,
      platforms: checkedPlatforms,
    });
  };

  return (
    <div className="form-background">
      <div>
        <Link to="/home" className="link">
          Back
        </Link>
      </div>
      <div className="form-card">
        <h1>Create Your Videogame</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="label">Game Name</label>
            <input
              name="name"
              onChange={handleChange}
              value={values.name}
              type="text"
              placeholder="Name..."
            />
          </div>
          <div className="form-row">
            <label className="label">Game Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={values.description}
              placeholder="Description..."
            />
          </div>
          <div className="form-row">
            <label className="label">Release Date</label>
            <input
              name="date"
              onChange={handleChange}
              value={values.date}
              type="date"
              placeholder="Release Date..."
            />
          </div>
          <div className="form-row">
            <label className="label">Rating</label>
            <input
              name="rating"
              onChange={handleChange}
              value={values.rating}
              type="number"
              min={0}
              max={5}
              placeholder="Rating..."
            />
          </div>
          <div className="form-row">
            <label className="label">Genres</label>
            {genres.map((genre) => {
              return (
                <div className="checkbox-container" key={genre[0].id}>
                  <label>
                    <input
                      type="checkbox"
                      value={genre[0].name}
                      name={genre[0].name}
                      onChange={handleChangeGenreCheckboxes}
                    />
                    {genre[0].name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="form-row">
            <label className="label">Platforms</label>
            {platforms.map((platform) => {
              return (
                <div className="checkbox-container" key={platform.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={platform.name}
                      name={platform.name}
                      onChange={handleChangePlatformCheckboxes}
                    />
                    {platform.name}
                  </label>
                </div>
              );
            })}
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
