import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import LoginInputError from "./LoginInputError";
import { ILoginFormInput, IRegisterFormInput } from "../interface";

type ValidationOptions = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
};

type ValidatedInputProps<T extends FieldValues> = {
  name: keyof T;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  validationOptions: ValidationOptions;
};

const ValidatedInput = <T extends IRegisterFormInput | ILoginFormInput>({
  name,
  register,
  errors,
  validationOptions,
}: ValidatedInputProps<T>) => {
  return (
    <div className="input-container">
      <label htmlFor={`${String(name)}`}>
        {String(name) === "password2" ? "Repeat Password" : String(name)}
      </label>
      <input
        type={
          name === "email"
            ? "email"
            : String(name).startsWith("password")
            ? "password"
            : "text"
        }
        id={`${String(name)}`}
        {...register(name as Path<T>, validationOptions)}
      />
      {errors[name]?.type && (
        <LoginInputError
          type={errors[name]?.type}
          message={errors[name]?.message}
          value={
            validationOptions[
              errors[name]?.type as keyof typeof validationOptions
            ] as number
          }
        />
      )}
    </div>
  );
};

export default ValidatedInput;
