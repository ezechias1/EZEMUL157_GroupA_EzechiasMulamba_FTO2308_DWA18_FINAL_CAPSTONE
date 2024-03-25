import { useState, useEffect } from "react";
import "./Episode.css";
import { useParams, useNavigate } from "react-router-dom";

export default function Episode() {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true); // State variable for loading status
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((episode) => {
        setData(episode);

        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [id]);

  useEffect(() => {
    console.log(data);
    // if (Object.keys(data).length !== 0) {
    //   data.seasons.forEach((season) => {
    //     console.log(`Season ${season.title} Episodes:`);
    //     season.episodes.forEach((episode) => {
    //       console.log(episode);
    //     });
    //   });
    // }
  }, [data]);

  const handleSeasonClickRoute = (episodes) => {
    navigate("/episodeList", { state: episodes });

    console.log("EPISODES", episodes);
  };

  return (
    <div>
      <button className="Back" onClick={() => window.history.back()}>
        Back
      </button>
      <h1>Episode Details</h1>
      {loading ? ( // Display loading state if data is being fetched
        <p className="load">Loading...</p>
      ) : (
        <div className="details-container">
          <h2 className="DataTitle">Title: {data.title}</h2>
          <p className="DataDes">Description: {data.description}</p>
          <img className="DataImg" src={data.image} alt={data.title} />
          {data.seasons.length && (
            <table className="SeasonsTable">
              <thead>
                <tr>
                  <th>Season</th>
                  <th>Number of Episodes</th>
                </tr>
              </thead>
              <tbody>
                {data.seasons.map((season) => (
                  <tr
                    key={season.id}
                    className="SeasonRow"
                    onClick={() => handleSeasonClickRoute(season.episodes)}
                  >
                    <td>{season.title}</td>
                    <td>{season.episodes.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
