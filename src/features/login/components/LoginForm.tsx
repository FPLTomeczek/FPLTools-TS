import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { LoginFormStyled } from "./Auth.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { Link } from "react-router-dom";
import { ILoginFormInput } from "../interface";
import { loginUser } from "../api/auth";
import AuthInputError from "./AuthInputError";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    const response = await loginUser(data);
    if (typeof response === "string") {
      setError("root", {
        type: "credentials",
        message: response,
      });
    } else {
      localStorage.setItem("token", response.token);
      navigate("/");
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
          {...register("username")}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
      </div>
      {errors.root?.type && (
        <AuthInputError type={errors.root.type} message={errors.root.message} />
      )}
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
