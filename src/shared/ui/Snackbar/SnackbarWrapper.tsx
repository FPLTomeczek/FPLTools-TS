import { Alert, Snackbar } from "@mui/material";

const SnackbarWrapper = ({
  error,
  handleSetError,
}: {
  error: { value: boolean; msg: string };
  handleSetError: (value: boolean, msg: string) => void;
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={error.value}
      autoHideDuration={6000}
      onClose={() => handleSetError(false, "")}
    >
      <Alert variant="filled" severity="error">
        {error.msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarWrapper;
