import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { useState } from "react";

import { AuthFormStyled as RegisterFormStyled } from "./Auth.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { IRegisterFormInput } from "../interface";
import { ValidResponse, registerUser } from "../api/auth";
import { AuthInputContainer } from "./AuthInputContainer";

function isValidResponse(response: any): response is ValidResponse {
  return response && "user" in response;
}

const RegisterForm = () => {
  const {
    register: registerRegister,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IRegisterFormInput>();

  const [isResponseValid, setIsResponseValid] = useState(false);

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    if (data.password !== data.password2) {
      setError("password2", {
        type: "passwordMatch",
        message: "Passwords do not match",
      });
      setIsResponseValid(false);
      return;
    }
    const response = await registerUser(data);

    if (isValidResponse(response)) {
      setIsResponseValid(true);
    } else {
      setIsResponseValid(false);
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
      <AuthInputContainer
        label="Username"
        id="username"
        type="text"
        register={registerRegister}
        name="username"
        validationOn={true}
        errors={errors as Record<keyof IRegisterFormInput, any>}
      />
      <AuthInputContainer
        label="Email"
        id="email"
        type="email"
        register={registerRegister}
        name="email"
        validationOn={true}
        errors={errors as Record<keyof IRegisterFormInput, any>}
      />
      <AuthInputContainer
        label="Password"
        id="password"
        type="password"
        autoComplete="new-password"
        register={registerRegister}
        validationOn={true}
        name="password"
        errors={errors as Record<keyof IRegisterFormInput, any>}
      />
      <AuthInputContainer
        label="Repeat Password"
        id="password2"
        type="password"
        autoComplete="new-password"
        register={registerRegister}
        name="password2"
        validationOn={true}
        errors={errors as Record<keyof IRegisterFormInput, any>}
      />
      {isResponseValid ? <Alert severity="info">Verification link send to your email</Alert> : null}
      <Button type="submit" onClick={() => setIsResponseValid(true)}>
        Sign In
      </Button>
      <span>
        Already a member?{" "}
        <Link to="/login">
          <span className="form-footer-element-link__text">Log In</span>
        </Link>
      </span>
    </RegisterFormStyled>
  );
};

export default RegisterForm;
