import { Alert } from "@mui/material";

import { ValidationError } from "../../../store_features/drafts/initializers";

export const AlertWrapper = ({
  validationError,
}: {
  validationError: ValidationError;
}) => {
  if (validationError.isError) {
    return <Alert severity="error">{validationError.message}</Alert>;
  } else if (!validationError.isError && validationError.message !== "") {
    return <Alert severity="success">{validationError.message}</Alert>;
  }

  return null;
};
