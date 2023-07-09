import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { ErrorPageStyled } from "./Pages.styled";
const Error = () => {
  return (
    <ErrorPageStyled>
      <h1>Ooops you have entered wrong page!</h1>
      <Link to="/" className="return-to-home">
        <HomeIcon />
      </Link>
    </ErrorPageStyled>
  );
};

export default Error;
