export interface ILoginFormInput {
  login: string;
  password: string;
}

export interface IRegisterFormInput extends ILoginFormInput {
  email: string;
  password2: string;
}
