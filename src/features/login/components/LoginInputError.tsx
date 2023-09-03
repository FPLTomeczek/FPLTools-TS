const LoginInputError = ({ type }: { type: string }) => {
  const getErrorMsg = () => {
    switch (type) {
      case "required":
        return "Field is required";
      case "pattern":
        return "No trailing or leading spaces allowed";
      default:
        return "Validation Error";
    }
  };

  return <span role="alert">{getErrorMsg()}</span>;
};

export default LoginInputError;
