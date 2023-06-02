import "../css/Navbar.css";
const Navbar = (props) => {
  return (
    <>
      <div
        className="navbar"
        style={{
          display: "flex",
        }}
      >
        <div className="navbar item">
          <a href="/">Dæven.no</a>
        </div>
        <div className="navbar item">
          <a href="#">Articles</a>
        </div>
        <div className="navbar item">
          <a href="#">Tools</a>
        </div>
        <div className="navbar item">
          <a href="/seasnake">seasnake</a>
        </div>
        <div className="navbar item">
          <a href="/pokedex">Pokedex</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
