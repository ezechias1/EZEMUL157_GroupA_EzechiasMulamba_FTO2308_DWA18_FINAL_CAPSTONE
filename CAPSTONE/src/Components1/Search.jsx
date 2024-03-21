
import  { useState, useEffect } from "react";
import "./Search.css";

export default function Search() {
  const [, setInput] = useState("");
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
        setFilteredShows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setInput(searchTerm);
    console.log(searchTerm)
    console.log(shows)

    const filtered = shows.filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShows(filtered);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Type to search..."
       
        onChange={handleInputChange}
      />
      <ul className="search-results">
        {filteredShows.map((show) => (
          <li key={show.id}>{show.title}</li>
        ))}
      </ul>
    </div>
  );
}
