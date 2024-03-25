
// eslint-disable-next-line react/prop-types
export default function NavBar({onButtonClick, onButtonClick1 , onButtonClick2}) {
  return (
    <div>
      <nav className="navbar">
        <div className="title">HereToHear</div>
      <div>
      <button className="FilterButton" onClick={onButtonClick}>
          From a-z filter
       </button> <br></br>
       <button className="FilterButton" onClick={onButtonClick1}>
          from z-a filter
       </button> <br/>
       <button className="FilterButton" onClick={onButtonClick2}>date filter</button>
       

      </div>

        
      </nav>
    </div>
  );
  }
