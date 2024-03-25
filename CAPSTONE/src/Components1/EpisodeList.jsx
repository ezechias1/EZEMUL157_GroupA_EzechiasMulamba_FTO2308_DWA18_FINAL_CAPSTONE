import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./episodelist.css";

const getEpisodeTitle = (title, type) => {
  if (!type) return title;

  const [splitTitle, splitPerson] = title.split(" | ");

  if (type === "title") return splitTitle;

  if (type === "feature") return splitPerson;
};

const EpisodeList = () => {
  const location = useLocation();
  const episodes = location.state;

  useEffect(() => console.log(episodes));

  return (
    <>
      <div className="container">
        {episodes.map((episode, idx) => (
          <div className="card" key={idx}>
            <div className="header">
              <span className="title-wrapper">
                <span className="title">
                  {getEpisodeTitle(episode.title, "title")}
                </span>
                <span className="episode-number">{episode.episode}</span>
              </span>
              <span className="featuring">
                {getEpisodeTitle(episode.title, "feature")}
              </span>
              <div className="description">
                <span>{episode.description}</span>
              </div>
            </div>

            <audio controls className="audio-player">
              <source src={episode.file} />
            </audio>
          </div>
        ))}
      </div>
    </>
  );
};

export default EpisodeList;
