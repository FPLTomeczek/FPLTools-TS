type LoginInputProps = {
  type: any;
  message?: any;
  value?: number;
};

const LoginInputError = ({ type, message, value }: LoginInputProps) => {
  if (type === "manual") {
    return <span role="alert">{message}</span>;
  }

  const getErrorMsg = () => {
    switch (type) {
      case "required":
        return "Field is required";
      case "pattern":
        return "No trailing or leading spaces allowed";
      case "minLength":
        return `Min ${value} Characters`;
      case "maxLength":
        return `Max ${value} Characters`;
      default:
        return "Validation Error";
    }
  };

  return <span role="alert">{getErrorMsg()}</span>;
};

export default LoginInputError;
