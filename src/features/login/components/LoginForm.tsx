import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormStyled } from "./Login.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import LoginInputError from "./LoginInputError";
import { noWhitespaceRegex } from "../../../shared/utils/regex";
import { Link } from "react-router-dom";

interface ILoginFormInput {
  login: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => console.log(data);
  const { darkMode } = useTheme();

  return (
    <LoginFormStyled onSubmit={handleSubmit(onSubmit)} darkMode={darkMode}>
      <div className="input-container">
        <label htmlFor="login">Login</label>
        <input
          id="login"
          {...register("login", {
            required: true,
            maxLength: 30,
            pattern: noWhitespaceRegex,
          })}
        />
        {errors.login?.type && <LoginInputError type={errors.login.type} />}
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: true,
            maxLength: 30,
            pattern: noWhitespaceRegex,
          })}
        />
        {errors.password?.type && (
          <LoginInputError type={errors.password.type} />
        )}
      </div>
      <Button type="submit">Submit</Button>
      <span>
        Not a member?{" "}
        <Link to="/register">
          <span>Register In</span>
        </Link>
      </span>
    </LoginFormStyled>
  );
};

export default LoginForm;
