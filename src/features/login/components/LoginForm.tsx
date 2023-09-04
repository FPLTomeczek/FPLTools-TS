import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormStyled } from "./Login.styled";
import { Button } from "../../../shared/ui/Buttons/Button";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { noWhitespaceRegex } from "../../../shared/utils/regex";
import { Link } from "react-router-dom";
import ValidatedInput from "./ValidatedInput";
import { ILoginFormInput } from "../interface";

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
        name="password"
        register={register}
        errors={errors}
        validationOptions={{
          required: true,
          maxLength: 30,
          pattern: noWhitespaceRegex,
        }}
      />
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
