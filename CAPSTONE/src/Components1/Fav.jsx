import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  formateDate,
  convertGenre,
  handleAscSort,
  handleAscSort1,
  handleDateAscSort,
  handleDateDescSort,
} from "../helpers";
import NavBar from "./NavBar";
import "./fav.css";

export default function Fav() {
  const location = useLocation();
  const favourites = location.state;

  useEffect(() => console.log(favourites));

  return (
    <div>
      <NavBar
        onButtonClick={() => handleAscSort()}
        onButtonClick1={() => handleAscSort1()}
        onButtonClick2={() => {
          handleDateAscSort();
          handleDateDescSort();
        }}
      />
      <button className="Back" onClick={() => window.history.back()}>
        Back
      </button>
      <div className="favourite-page">FAVOURITES</div>
      {favourites.map((show) => (
        <div key={show.id} className="episode">
          <img src={show.image} alt={show.title} />
          <div className="episode-details">
            <h3>{show.title}</h3>
            <p>Seasons: {show.seasons}</p>
            <p>Genres: {convertGenre(show.genres)}</p>
            <p>Last Updated: {formateDate(show.updated)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
