import LoginForm from "../../features/login/components/LoginForm";
import Hero from "../../layouts/components/Hero";
import { LoginPageStyled } from "../Pages.styled";

const Login = () => {
  return (
    <LoginPageStyled>
      <Hero>Login</Hero>
      <LoginForm />
    </LoginPageStyled>
  );
};

export default Login;
