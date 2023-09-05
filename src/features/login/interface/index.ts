export interface ILoginFormInput {
  username: string;
  password: string;
}

export interface IRegisterFormInput extends ILoginFormInput {
  email: string;
  password2: string;
}
