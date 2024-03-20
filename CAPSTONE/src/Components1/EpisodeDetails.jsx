import { Link, useParams } from "react-router-dom";
export default function EpisodeDetails() {
  const { id } = useParams();

  // Fetch podcast details using the 'id' parameter

  return (
    <div>
      <h2>Podcast Detail</h2>
      <Link>
        <p>ID: {id}</p>
        {}
      </Link>
    </div>
  );
}
