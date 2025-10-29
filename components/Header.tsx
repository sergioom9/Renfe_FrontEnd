const Header = () => {
  return (
    <header>
      <div className="liquid-glass">
        <div className="button-group">
          <a href="/" className="headerbutton">
            Menu
          </a>
          <a href="/news" className="headerbutton">
            News
          </a>
          <a href="/login" className="headerbutton">
            Login
          </a>
          <a href="/register" className="headerbutton">
            Register
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;