import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../shared/utils/config/axiosConfig";

const VerifyEmailInfo = () => {
  const { userID, emailToken } = useParams();
  const [emailVerificated, setEmailVerificated] = useState<{
    status: boolean;
    msg: string;
  }>({ status: true, msg: "" });

  useEffect(() => {
    const fetchEmailVerification = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/users/verify/${userID}/${emailToken}`
        );
        setEmailVerificated({ status: true, msg: data.msg });
        console.log(data);
        return data;
      } catch (error: any) {
        setEmailVerificated({ status: false, msg: error.response.data.msg });
        console.log(error);
      }
    };
    fetchEmailVerification();
  }, []);

  return (
    <Alert severity={emailVerificated.status ? "success" : "error"}>
      {emailVerificated.msg}
    </Alert>
  );
};

export default VerifyEmailInfo;
