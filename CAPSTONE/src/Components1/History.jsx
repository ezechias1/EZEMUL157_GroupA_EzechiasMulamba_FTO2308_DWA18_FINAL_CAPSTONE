import  { useEffect, useState } from 'react';
import NavBar from './NavBar';
const History = () => {
  const [listeningHistory, setListeningHistory] = useState([]);

  useEffect(() => {
    // Fetch the user's listening history from an API or local storage
    const fetchListeningHistory = async () => {
      try {
        // Make an API call to fetch the user's listening history data
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setListeningHistory(data); // Update the listeningHistory state with fetched data
      } catch (error) {
        console.error('Error fetching listening history:', error);
      }
    };

    fetchListeningHistory(); // Call the fetchListeningHistory function when the component mounts
  }, []);

  return (
    
    <div>
        <NavBar/>
      <h1>Listening History</h1>
      <ul>
        {listeningHistory.map((item) => (
          <li key={item.id}>
            <strong>Show Title:</strong> {item.showTitle}, <strong>Episode:</strong> {item.episodeTitle},{' '}
            <strong>Last Listened:</strong> {item.lastListened}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
