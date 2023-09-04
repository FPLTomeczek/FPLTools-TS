import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import { LoginFormStyled as RegisterFormStyled } from "./Login.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { emailRegex, noWhitespaceRegex } from "../../../shared/utils/regex";
import ValidatedInput from "./ValidatedInput";
import { IRegisterFormInput } from "../interface";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<IRegisterFormInput>();

  const password = watch("password");

  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    if (data.password !== data.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    console.log(data);
  };
  const { darkMode } = useTheme();

  return (
    <RegisterFormStyled onSubmit={handleSubmit(onSubmit)} darkMode={darkMode}>
      <ValidatedInput
        name="login"
        register={register}
        errors={errors}
        validationOptions={{
          required: true,
          maxLength: 30,
          pattern: noWhitespaceRegex,
          minLength: 5,
        }}
      />
      <ValidatedInput
        name="email"
        register={register}
        errors={errors}
        validationOptions={{
          required: true,
          pattern: emailRegex,
        }}
      />
      <ValidatedInput
        name="password"
        register={register}
        errors={errors}
        validationOptions={{
          required: true,
          maxLength: 30,
          pattern: noWhitespaceRegex,
          minLength: 8,
        }}
      />
      <ValidatedInput
        name="password2"
        register={register}
        errors={errors}
        validationOptions={{
          required: true,
          maxLength: 30,
          pattern: noWhitespaceRegex,
          minLength: 8,
        }}
      />
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
