import { axiosInstance } from "../../../shared/utils/config/axiosConfig";
import { ILoginFormInput, IRegisterFormInput } from "../interface";

export type ValidResponse = {
  user: {
    _id: string;
    username: string;
    password: string;
    email: string;
    __v: number;
  };
};

export type RegisterInvalidResponse = {
  msg: string;
  fields: Array<keyof IRegisterFormInput>;
};

export const registerUser = async (
  registerInput: IRegisterFormInput
): Promise<ValidResponse | RegisterInvalidResponse> => {
  const { email, username, password } = registerInput;
  try {
    const { data } = await axiosInstance.post("/users/register", {
      email,
      username,
      password,
    });
    return data as ValidResponse;
  } catch (error: any) {
    return {
      msg: error.response.data.msg,
      fields: error.response.data.fields,
    } as RegisterInvalidResponse;
  }
};

export const loginUser = async (registerInput: ILoginFormInput) => {
  const { username, password } = registerInput;
  try {
    const { data } = await axiosInstance.post("/users/login", {
      username,
      password,
    });
    return data;
  } catch (error: any) {
    return error.response.data.msg;
  }
};
