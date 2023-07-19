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
          <li key={li.name}>
            <Link to={li.url}>{li.name}</Link>
          </li>
        ))}
      </ul>
      <ul className="nav-list mobile">
        <li>
          <Link to="/">FPLTools</Link>
        </li>
        <li>
          <FullScreenDialog listItems={navbarList} />
        </li>
      </ul>
    </NavbarStyled>
  );
};

export default Navbar;
