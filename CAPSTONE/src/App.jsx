import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import LOGINPAGE from './Components1/LOGINPAGE';
import FrontPage from "./Components1/FrontPage";
import Episode from "./Components1/Episode";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/episode/:id" element={<Episode />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
