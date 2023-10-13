import { NavLink } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Header() {
  const {value: loggedIn, setValue: setLoggedIn} = useLocalStorage<boolean>(false, "loggedIn");

  function handleLogin(): void {
    setLoggedIn(true);
  }

  return (
    <header>
        <div className="header-left">
          <NavLink to={'/'}>Home</NavLink>
          {loggedIn && <NavLink to={'/favorites'}>Favorites</NavLink>}
        </div>
        <div className="header-right">
            {!loggedIn && <span className="btn-primary" onClick={handleLogin}>Login</span>}
        </div>
    </header>
  );
}

export default Header;
