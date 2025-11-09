const Header = () => {
  return (
    <header>
      <div className="liquid-glass">
        <div className="button-group">
          <a href="/" className="headerbutton">
            Menu
          </a>
          <a href="/tickets" className="headerbutton">
            Billetes
          </a>
          <a href="/news" className="headerbutton">
            Noticias
          </a>
          <a href="/login" className="headerbutton">
            Inicio Sesion
          </a>
          <a href="/register" className="headerbutton">
            Registro
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;