import { Link } from "react-router-dom";
import styled from "styled-components";

const navbarList = [
  { url: "/", name: "FPLTools" },
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
    </NavbarStyled>
  );
};

const NavbarStyled = styled.nav`
  border-bottom: 1px solid var(--secondary-color);
  .nav-list {
    margin-left: 1rem;
    display: flex;
    gap: 2rem;
  }
  .nav-list > li {
    padding: 0.5rem;
  }
  .nav-list a {
    color: white;
  }
  .nav-list a:visited {
    color: white;
  }
`;

export default Navbar;
