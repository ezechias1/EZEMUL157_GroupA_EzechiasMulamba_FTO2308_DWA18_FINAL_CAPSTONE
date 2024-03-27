import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import LOGINPAGE from './Components1/LOGINPAGE';
import FrontPage from "./Components1/FrontPage";
import Episode from "./Components1/Episode";
import EpisodeList from "./Components1/EpisodeList";
// import History from "./Components1/History";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/episode/:id" element={<Episode />} />
            <Route path="episodeList" element={<EpisodeList />} />
            {/* <Route path="/History"  element={<History/>} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
