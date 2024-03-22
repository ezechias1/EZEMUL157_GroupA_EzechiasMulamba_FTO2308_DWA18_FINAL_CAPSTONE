
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Episode.css";

export default function Episode() {
  const [data, setData] = useState({});
  const [seasonsCount, setSeasonsCount] = useState(null);  
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((episode) => {
        setData(episode);
        setSeasonsCount(episode.seasons.length);  
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <div>
      <button className="Back" onClick={() => window.history.back()}>Back</button>
      <h1>Episode Details</h1>
      {Object.keys(data).length !== 0 ? (
        <div className="details-container">
          <h2 className="DataTitle">Title: {data.title}</h2>
          <p className="DataDes">Description: {data.description}</p>
          <img className="DataImg" src={data.image} alt={data.title} />
          {seasonsCount !== null && <p>Number of Seasons: {seasonsCount}</p>} 
        </div>
      ) : (
        <p className="load">Loading...</p>
      )}
    </div>
  );
}

