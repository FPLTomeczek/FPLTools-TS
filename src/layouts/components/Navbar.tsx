import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { FullScreenDialog } from "../../shared/ui/Dialog/FullScreenDialog";
import { NavbarStyled } from "./Navbar.styled";
import logo from "../../shared/assets/logos/fpltools_logo.webp";
import DefaultSwitch from "../../shared/ui/Switch/DefaultSwitch";
import { useTheme } from "../../shared/theme/ThemeProvider";

const navbarList = [
  { url: "/", name: "Planner" },
  { url: "/player-rankings", name: "Players" },
  { url: "/calendar", name: "Calendar" },
  { url: "/news", name: "News" },
];

const Navbar = () => {
  const [activePage, setActivePage] = useState(navbarList[0].name);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { darkMode } = useTheme();

  const handleSettingActivePage = (name: string) => {
    setActivePage(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <NavbarStyled darkMode={darkMode}>
      <ul className="nav-list">
        <li className="list-item-navbar">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </li>

        {navbarList.map((li) => (
          <li
            className="list-item-navbar"
            key={li.name}
            onClick={() => handleSettingActivePage(li.name)}
          >
            <Link
              className={`list-item-navbar__link${
                activePage === li.name ? "__active" : ""
              }`}
              to={li.url}
            >
              {li.name}
            </Link>
          </li>
        ))}
        <li className="mobile-visible">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </li>
        <li className="mobile-visible">
          <FullScreenDialog
            listItems={navbarList}
            activePage={activePage}
            handleSettingActivePage={handleSettingActivePage}
          />
        </li>
      </ul>
      <div className="navbar-right-content">
        <DefaultSwitch />
        <Link to="/login">
          <div className="navbar-right-content__auth">
            <AccountCircleIcon />
            <button
              className="navbar-right-content__auth__button"
              onClick={logout}
            >
              <span>{token ? "Logout" : "Login"}</span>
            </button>
          </div>
        </Link>
      </div>
    </NavbarStyled>
  );
};

export default Navbar;
