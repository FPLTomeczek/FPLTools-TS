import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormStyled } from "./Login.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { noWhitespaceRegex } from "../../../shared/utils/regex";
import { Link } from "react-router-dom";
import { ILoginFormInput } from "../interface";
import { loginUser } from "../api/auth";
import LoginInputError from "./LoginInputError";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    const response = await loginUser(data);
    if (typeof response === "string") {
      setError("root", {
        type: "manual",
        message: response,
      });
    } else {
      console.log(data);
    }
  };
  const { darkMode } = useTheme();

  return (
    <LoginFormStyled onSubmit={handleSubmit(onSubmit)} darkMode={darkMode}>
      <div className="input-container">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          autoComplete="username"
          {...register("username", {
            required: true,
            minLength: 5,
            maxLength: 30,
            pattern: noWhitespaceRegex,
          })}
        />
        {errors.username?.type && (
          <LoginInputError type={errors.username.type} input="username" />
        )}
      </div>
      <div className="input-container">
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 30,
            pattern: noWhitespaceRegex,
          })}
        />
        {errors.password?.type && (
          <LoginInputError type={errors.password.type} input="password" />
        )}
      </div>
      {errors.root ? <span role="alert">{errors.root.message}</span> : null}
      <Button type="submit">Login</Button>
      <span>
        Not a member?{" "}
        <Link to="/register">
          <span className="register-text">Register In</span>
        </Link>
      </span>
    </LoginFormStyled>
  );
};

export default LoginForm;
