import { Link } from "react-router-dom";
import { FullScreenDialog } from "../../shared/ui/Dialog/FullScreenDialog";
import { NavbarStyled } from "./Navbar.styled";
import logo from "../../shared/assets/logos/fpltools_logo.png";

const navbarList = [
  { url: "/", name: "Planner" },
  { url: "/player-rankings", name: "Players" },
  { url: "/calendar", name: "Calendar" },
];

const Navbar = () => {
  return (
    <NavbarStyled>
      <ul className="nav-list">
        <li className="list-item-navbar">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </li>
        {navbarList.map((li) => (
          <li className="list-item-navbar" key={li.name}>
            <Link to={li.url}>{li.name}</Link>
          </li>
        ))}
        <li className="list-item-navbar-mobile">
          <Link to="/">
            <img src={logo} alt="logo" className="navbar-logo" />
          </Link>
        </li>
        <li className="list-item-navbar-mobile">
          <FullScreenDialog listItems={navbarList} />
        </li>
      </ul>
    </NavbarStyled>
  );
};

export default Navbar;
