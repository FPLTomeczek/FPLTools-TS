import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import { LoginFormStyled as RegisterFormStyled } from "./Login.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { emailRegex, noWhitespaceRegex } from "../../../shared/utils/regex";
import { IRegisterFormInput } from "../interface";
import {
  RegisterInvalidResponse,
  ValidResponse,
  registerUser,
} from "../api/auth";
import LoginInputError from "./LoginInputError";

function isValidResponse(response: any): response is ValidResponse {
  return response && "user" in response && "token" in response;
}

function isRegisterInvalidResponse(
  response: any
): response is RegisterInvalidResponse {
  return response && "msg" in response && "fields" in response;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IRegisterFormInput>();

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    if (data.password !== data.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const response = await registerUser(data);
    console.log(response);

    if (isValidResponse(response)) {
      console.log("This is a valid response", response);
    } else if (isRegisterInvalidResponse(response)) {
      console.log("This is an invalid registration response", response);
      response.fields.map((field) => {
        setError(field, {
          type: "manual",
          message: response.msg,
        });
      });
    }
  };

  const { darkMode } = useTheme();

  return (
    <RegisterFormStyled onSubmit={handleSubmit(onSubmit)} darkMode={darkMode}>
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: true,
            pattern: emailRegex,
          })}
        />
        {errors.email?.type && (
          <LoginInputError type={errors.email.type} input="email" />
        )}
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
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
      <div className="input-container">
        <label htmlFor="password2">Repeat Password</label>
        <input
          id="password2"
          type="password"
          autoComplete="new-password"
          {...register("password2", {
            required: true,
            minLength: 8,
            maxLength: 30,
            pattern: noWhitespaceRegex,
          })}
        />
        {errors.password2?.type && (
          <LoginInputError type={errors.password2.type} input="password" />
        )}
      </div>
      <Button type="submit">Sign In</Button>
      <span>
        Already a member?{" "}
        <Link to="/login">
          <span className="register-text">Log In</span>
        </Link>
      </span>
    </RegisterFormStyled>
  );
};

export default RegisterForm;
