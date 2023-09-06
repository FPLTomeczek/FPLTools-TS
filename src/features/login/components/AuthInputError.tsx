type LoginInputProps = {
  type: any;
  input?: string;
};

const AuthInputError = ({ type, input }: LoginInputProps) => {
  if (type === "credentials") {
    return <span role="alert">Invalid Credentials</span>;
  }

  if (type === "duplicate") {
    return <span role="alert">{`User with this ${input} already exists`}</span>;
  }

  if (type === "passwordMatch" && input === "password2") {
    return <span role="alert">Passwords do not match</span>;
  }

  const getErrorMsg = () => {
    switch (type) {
      case "required":
        return "Field is required";
      case "pattern":
        if (input === "email") {
          return "Wrong email";
        }
        return "No spaces allowed";
      case "minLength":
        return `Min ${input === "username" ? "5" : "8"} Characters`;
      case "maxLength":
        return `Max 30 Characters`;
      default:
        return "Validation Error";
    }
  };

  return <span role="alert">{getErrorMsg()}</span>;
};

export default AuthInputError;
