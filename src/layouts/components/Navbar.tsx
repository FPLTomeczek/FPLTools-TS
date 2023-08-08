import { Link } from "react-router-dom";
import { useState } from "react";

import { FullScreenDialog } from "../../shared/ui/Dialog/FullScreenDialog";
import { NavbarStyled } from "./Navbar.styled";
import logo from "../../shared/assets/logos/fpltools_logo.webp";
import { Button } from "../../shared/ui/Buttons/Button";
import { useTheme } from "../../shared/theme/ThemeProvider";
import DefaultSwitch from "../../shared/ui/Switch/DefaultSwitch";

const navbarList = [
  { url: "/", name: "Planner" },
  { url: "/player-rankings", name: "Players" },
  { url: "/calendar", name: "Calendar" },
];

const Navbar = () => {
  const [activePage, setActivePage] = useState(navbarList[0].name);

  const handleSettingActivePage = (name: string) => {
    setActivePage(name);
  };

  const { toggleTheme } = useTheme();
  return (
    <NavbarStyled>
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
              className={`${
                activePage === li.name ? "text-secondary-light" : ""
              }`}
              to={li.url}
            >
              {li.name}
            </Link>
          </li>
        ))}
        <li className="list-item-navbar-mobile">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </li>
        <li className="list-item-navbar-mobile">
          <FullScreenDialog
            listItems={navbarList}
            activePage={activePage}
            handleSettingActivePage={handleSettingActivePage}
          />
        </li>
      </ul>
      <DefaultSwitch />
    </NavbarStyled>
  );
};

export default Navbar;
