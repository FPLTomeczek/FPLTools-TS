import { UseFormRegister } from "react-hook-form";

import { noWhitespaceRegex, emailRegex } from "../../../shared/utils/regex";
import AuthInputError from "./AuthInputError";
import { ILoginFormInput, IRegisterFormInput } from "../interface";

type InputContainerProps = {
  label: string;
  id: string;
  type: string;
  autoComplete?: string;
  register: UseFormRegister<IRegisterFormInput> | UseFormRegister<ILoginFormInput>;
  name: keyof IRegisterFormInput | keyof ILoginFormInput;
  validationOn?: boolean;
  errors?: Record<keyof IRegisterFormInput | keyof ILoginFormInput, any>;
};

export const AuthInputContainer = ({ label, id, type, autoComplete, register, name, errors, validationOn }: InputContainerProps) => {
  const validation = validationOn
    ? {
        required: true,
        minLength: type === "password" ? 8 : 5,
        pattern: type === "email" ? emailRegex : noWhitespaceRegex,
      }
    : {};

  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} autoComplete={autoComplete} {...(register as UseFormRegister<IRegisterFormInput | ILoginFormInput>)(name, validation)} />
      {errors && errors[name]?.type && <AuthInputError type={errors[name].type} input={name} />}
    </div>
  );
};
