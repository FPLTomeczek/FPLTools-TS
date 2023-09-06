import RegisterForm from "../features/login/components/RegisterForm";
import Hero from "../layouts/components/Hero";
import { LoginPageStyled as RegisterPageStyled } from "./Pages.styled";

const Register = () => {
  return (
    <RegisterPageStyled>
      <Hero>Register</Hero>
      <RegisterForm />
    </RegisterPageStyled>
  );
};

export default Register;
