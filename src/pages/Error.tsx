import { Link } from "react-router-dom";

import { ErrorPageStyled } from "./Pages.styled";
import { Button } from "../shared/ui/Buttons/Button";

const Error = () => {
  return (
    <ErrorPageStyled>
      <h1>Ooops you have entered wrong page!</h1>
      <Link to="/" className="return-to-home">
        <Button>Return To Home Page</Button>
      </Link>
    </ErrorPageStyled>
  );
};

export default Error;
