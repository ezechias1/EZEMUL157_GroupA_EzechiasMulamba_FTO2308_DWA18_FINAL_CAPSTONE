import { useEffect, useState, useCallback } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Search from "./Search";

const genreMap = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "news",
  9: "Kids and Family",
};

export default function FrontPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((shows) => {
        setData(shows);
        setFilteredData(shows);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  const formateDate = (date) => {
    const dateAsDateTime = new Date(date);
    const formattedDate = dateAsDateTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  const convertGenre = (genres) => {
    const convertedGenres = genres.map((item) => genreMap[item]);

    return convertedGenres.join(", ");
  };

  const handleAscSort = () => {
    // Sort Data Alphabetically by Title
    const sortedData = data.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleInputChange = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(data);
    }

    const filteredData = data.filter((show) => {
      if (show.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return show;
      }
      if (show.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return show;
      }
    });

    setFilteredData(filteredData);
  };

  return (
    <div>
      <NavBar
        onButtonClick={() => {
          handleAscSort();
          forceUpdate();
        }}
      />
      <Search handleInputChange={(e) => handleInputChange(e)} />
      <div className="info">
        {loading ? ( // Display loading state if data is being fetched
          <p className="load">Loading...</p>
        ) : (
          <>
            {filteredData.length > 0 ? (
              filteredData.map((show) => (
                <Link to={`Episode/${show.id}`} key={show.id}>
                  <div key={show.id} className="episode">
                    <img src={show.image} alt={show.title} />
                    <div className="episode-details">
                      <h3>{show.title}</h3>
                      <p>Seasons: {show.seasons}</p>
                      <p>Genres: {convertGenre(show.genres)}</p>
                      <p>Last Updated: {formateDate(show.updated)}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>No Results</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
