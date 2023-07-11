import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarStyled>
      <ul className="nav-list">
        <li>
          <Link to="/">FPLTools</Link>
        </li>
        <li>
          <Link to="/">Planner </Link>
        </li>
        <li>
          <Link to="/player-rankings">Players</Link>
        </li>
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
