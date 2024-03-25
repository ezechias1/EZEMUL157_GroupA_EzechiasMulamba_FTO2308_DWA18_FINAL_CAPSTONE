/* eslint-disable react/prop-types */
import  { useState } from 'react';

export default function SeasonEpisodes({ season }) {
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  return (
    <div>
      <button className="Back" onClick={() => window.history.back()}>
        Back
      </button>
      <h3>{season.title}</h3>
      <button onClick={() => setShowAllEpisodes(!showAllEpisodes)}>
        {showAllEpisodes ? 'Hide Episodes' : 'Show All Episodes'}
      </button>
      <ul>
        {showAllEpisodes
          ? season.episodes.map((episode) => (
              <li key={episode.id}>
                <strong>{episode.title}</strong> - {episode.description}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
