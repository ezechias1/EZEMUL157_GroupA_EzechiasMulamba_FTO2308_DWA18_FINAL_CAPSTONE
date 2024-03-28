import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { formateDate, convertGenre } from "../helpers";
import "../App.css";
import NavBar from "./NavBar";
import { useState } from "react";

export default function Fav() {
  const location = useLocation();
  const favourites = location.state;

  const [sortedfavourites, setsortedfavourites] = useState(favourites);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [sortByDateAsc, setSortByDateAsc] = useState(false);
  useEffect(() => {
    console.log(favourites);
  }, [favourites]); // Add favourites to dependency array for useEffect

  const handleAscSort = () => {
    console.log(sortedfavourites);
    // Sort Data Alphabetically by Title(A to Z )
    const sortedData = sortedfavourites.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    setsortedfavourites(sortedData);
    console.log(sortedfavourites);
  };

  const handleAscSort1 = () => {
    // Sort Data Alphabetically by Title (Z to A)
    const sortedData = sortedfavourites.sort((a, b) => {
      if (b.title < a.title) {
        return -1;
      }
      if (b.title > a.title) {
        return 0;
      }
      return 1;
    });
    setsortedfavourites(sortedData);
  };

  const handleDateAscSort = () => {
    const sortedData = sortedfavourites.sort((a, b) => {
      return new Date(a.updated) - new Date(b.updated);
    });
    setsortedfavourites(sortedData);
    setSortByDateAsc(true);
  };

  const handleDateDescSort = () => {
    const sortedData = sortedfavourites.sort((a, b) => {
      return new Date(b.updated) - new Date(a.updated);
    });
    setsortedfavourites(sortedData);
    setSortByDateAsc(false);
  };

  return (
    <div>
      <NavBar
        onButtonClick={() => {
          handleAscSort();
          forceUpdate();
        }}
        onButtonClick1={() => {
          handleAscSort1();
          forceUpdate();
        }}
        onButtonClick2={() => {
          if (sortByDateAsc) {
            handleDateDescSort();
          } else {
            handleDateAscSort();
          }
          forceUpdate();
        }}
      />
      <button className="Back" onClick={() => window.history.back()}></button>
      <div className="favourite-page">FAVOURITES PAGE</div>
      <div className="info">
        {favourites ? (
          favourites.map((show) => (
            <div key={show.id} className="episode">
              <img src={show.image} alt={show.title} />
              <div className="episode-details">
                <h3>{show.title}</h3>
                <p>Seasons: {show.seasons}</p>
                <p>Genres: {convertGenre(show.genres)}</p>
                <p>Last Updated: {formateDate(show.updated)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading favourites...</p>
        )}
      </div>
    </div>
  );
}
