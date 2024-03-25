
// eslint-disable-next-line react/prop-types
export default function NavBar({onButtonClick}) {
  return (
    <div>
      <nav className="navbar">
        <div className="title">HereToHear</div>
        <button className="FilterButton" onClick={onButtonClick}>
          A to Z
       </button>
      </nav>
    </div>
  );
  }
