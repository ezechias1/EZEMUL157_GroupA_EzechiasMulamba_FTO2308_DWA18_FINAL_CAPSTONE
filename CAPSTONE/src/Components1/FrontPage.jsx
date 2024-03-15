import { useEffect, useState } from "react";
import NavBar from "./NavBar"
export default function FrontPage() {
  const [data, setData] = useState([]);

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



  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((shows) => setData(shows))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (data.length > 0) console.log(data);
  }, [data]);
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

  return (
    
    <div>
<NavBar/>

    <div className="info">
      {data.map((show) => (
        <div key={show.episode} className="episode">
          <img src={show.image} alt={show.title} />
          <div className="episode-details">
            <h3>{show.title}</h3>

            <p>Seasons: {show.seasons}</p>
            <p>Genres: {convertGenre(show.genres)}</p>
            <p>Last Updated:{formateDate(show.updated)}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
  );
}
