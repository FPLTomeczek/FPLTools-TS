import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthFormStyled as LoginFormStyled } from "./Auth.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { ILoginFormInput, IRegisterFormInput } from "../interface";
import { loginUser } from "../api/auth";
import AuthInputError from "./AuthInputError";
import LoginFormFooter from "./LoginFormFooter";
import { AuthInputContainer } from "./AuthInputContainer";

const LoginForm = () => {
  const {
    register: loginRegister,
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
      <AuthInputContainer
        label="Username"
        id="username"
        type="text"
        register={loginRegister}
        name="username"
        errors={errors as Record<keyof IRegisterFormInput, any>}
      />
      <AuthInputContainer
        label="Password"
        id="password"
        type="password"
        register={loginRegister}
        autoComplete="current-password"
        name="password"
        errors={errors as Record<keyof IRegisterFormInput, any>}
      />
      {errors.root?.type && <AuthInputError type={errors.root.type} message={errors.root.message} />}
      <Button type="submit">Login</Button>
      <LoginFormFooter />
    </LoginFormStyled>
  );
};

export default LoginForm;
