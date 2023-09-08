import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../shared/utils/config/axiosConfig";

const VerifyEmailInfo = () => {
  const { userID, emailToken } = useParams();

  useEffect(() => {
    const fetchEmailVerification = async () => {
      const { data } = await axiosInstance.get(
        `/users/verify/${userID}/${emailToken}`
      );
      console.log(data);
      return data;
    };

    fetchEmailVerification();
  }, []);

  return (
    <Alert severity="success">Congratulations! Your account is verified.</Alert>
  );
};

export default VerifyEmailInfo;
