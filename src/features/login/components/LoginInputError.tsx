type LoginInputProps = {
  type: any;
  message?: any;
  input?: string;
};

const LoginInputError = ({ type, message, input }: LoginInputProps) => {
  if (type === "manual") {
    return <span role="alert">{message}</span>;
  }

  const getErrorMsg = () => {
    switch (type) {
      case "required":
        return "Field is required";
      case "pattern":
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

export default LoginInputError;
