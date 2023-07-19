import { Link } from "react-router-dom";
import { FullScreenDialog } from "../../shared/ui/Dialog/FullScreenDialog";
import { NavbarStyled } from "./Navbar.styled";

const navbarList = [
  { url: "/", name: "Planner" },
  { url: "/player-rankings", name: "Players" },
  { url: "/calendar", name: "Calendar" },
];

const Navbar = () => {
  return (
    <NavbarStyled>
      <ul className="nav-list">
        {navbarList.map((li) => (
          <li className="list-item-navbar" key={li.name}>
            <Link to={li.url}>{li.name}</Link>
          </li>
        ))}
        <li className="list-item-navbar-mobile">
          <Link to="/">FPLTools</Link>
        </li>
        <li className="list-item-navbar-mobile">
          <FullScreenDialog listItems={navbarList} />
        </li>
      </ul>
    </NavbarStyled>
  );
};

export default Navbar;
