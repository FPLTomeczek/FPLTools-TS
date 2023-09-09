import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../../shared/ui/Buttons/Button";
import { EmailVerificationRedirectStyled } from "./Auth.styled";

const EmailVerificationRedirect = () => {
  const [timeToRedirect, setTimeToRedirect] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToRedirect((state) => {
        if (state === 1) {
          clearInterval(interval);
          navigate("/login");
        }
        return state - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <EmailVerificationRedirectStyled>
      <div>You' ll be redirected to login page in {timeToRedirect} seconds</div>
      <Link to="/login">
        <Button>Go to Login Page</Button>
      </Link>
    </EmailVerificationRedirectStyled>
  );
};

export default EmailVerificationRedirect;
