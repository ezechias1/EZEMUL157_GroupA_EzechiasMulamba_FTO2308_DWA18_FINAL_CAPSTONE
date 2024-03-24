import "./Search.css";

// eslint-disable-next-line react/prop-types
export default function Search({ handleInputChange }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Type to search..."
        onChange={(e) => handleInputChange(e.currentTarget.value)}
      />
    </div>
  );
}

