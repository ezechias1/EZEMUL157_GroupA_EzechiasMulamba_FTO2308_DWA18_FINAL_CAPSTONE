
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Episode.css"; // Import CSS file

export default function Episode() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((shows) => setData(shows))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <div>
<button className="Back">Back</button>

      <h1>Episode Details</h1>
      {data.length !== 0 ? (
        <div className="details-container"> 
          <h2 className="DataTitle">Title: {data.title}</h2>
          <p className="DataDes">Description: {data.description}</p>
          <img className="DataImg" src={data.image} alt={data.title} />
        </div>
      ) : (
        <p className="load">Loading...</p>
      )}
    </div>
  );
}
