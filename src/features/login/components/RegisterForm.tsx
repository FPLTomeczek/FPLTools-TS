import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { useState } from "react";

import { LoginFormStyled as RegisterFormStyled } from "./Auth.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { emailRegex, noWhitespaceRegex } from "../../../shared/utils/regex";
import { IRegisterFormInput } from "../interface";
import {
  RegisterInvalidResponse,
  ValidResponse,
  registerUser,
} from "../api/auth";
import AuthInputError from "./AuthInputError";

function isValidResponse(response: any): response is ValidResponse {
  return response && "user" in response;
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

  const [isResponseValid, setIsResponseValid] = useState(false);

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    setIsResponseValid(false);
    if (data.password !== data.password2) {
      setError("password2", {
        type: "passwordMatch",
        message: "Passwords do not match",
      });
    }
    // Optimistic Email Verification Rendering
    setIsResponseValid(true);
    const response = await registerUser(data);

    if (isValidResponse(response)) {
      console.log("This is a valid response", response);
    } else if (isRegisterInvalidResponse(response)) {
      setIsResponseValid(false);
      console.log("This is an invalid registration response", response);
      if (response.msg === "Duplicate values.") {
        response.fields.map((field) => {
          setError(field, {
            type: "duplicate",
            message: response.msg,
          });
        });
      }
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
          <AuthInputError type={errors.username.type} input="username" />
        )}
      </div>
      <div className="input-container">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", {
            required: true,
            pattern: emailRegex,
          })}
        />
        {errors.email?.type && (
          <AuthInputError type={errors.email.type} input="email" />
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
            pattern: noWhitespaceRegex,
          })}
        />
        {errors.password?.type && (
          <AuthInputError type={errors.password.type} input="password" />
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
            pattern: noWhitespaceRegex,
          })}
        />
        {errors.password2?.type && (
          <AuthInputError type={errors.password2.type} input="password2" />
        )}
      </div>
      {isResponseValid ? (
        <Alert severity="info">Verification link send to your email</Alert>
      ) : null}
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
