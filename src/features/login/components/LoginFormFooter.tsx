import { LoginFormFooterStyled } from "./Auth.styled";
import LoginFormFooterElement from "./LoginFormFooterElement";

const LoginFormFooter = () => {
  return (
    <LoginFormFooterStyled>
      <LoginFormFooterElement text={{ questionText: "Forgot password?", link: "/reset-password", linkText: "Reset Password" }} />
      <LoginFormFooterElement text={{ questionText: "Not a member?", link: "/register", linkText: "Register In" }} />
    </LoginFormFooterStyled>
  );
};

export default LoginFormFooter;
