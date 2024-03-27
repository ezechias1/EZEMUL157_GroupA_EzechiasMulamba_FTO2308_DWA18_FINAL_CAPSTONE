/* eslint-disable react/prop-types */

// import { Link } from 'react-router-dom';

const NavBar = ({ onButtonClick, onButtonClick1, onButtonClick2, onButtonClick3,  }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="title">HereToHear</div>
        <div>
          <button className="FilterButton" onClick={onButtonClick}>
            From a-z filter
          </button>
          <br></br>
          <button className="FilterButton" onClick={onButtonClick1}>
            from z-a filter
          </button>
          <br />
          <button className="FilterButton" onClick={onButtonClick2}>
            date filter
          </button>
          <br />
          <button className="FilterButton" onClick={onButtonClick3}>
            Favourites
          </button>
          {/* <Link to="/history">
            <button className="FilterButton" onClick={onButtonClick4}>
              History
            </button>
          </Link> */}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
