import EmailVerificationRedirect from "../../features/login/components/EmailVerificationRedirect";
import VerifyEmailInfo from "../../features/login/components/VerifyEmailInfo";
import { VerifyEmailPageStyled } from "../Pages.styled";

const VerifyEmail = () => {
  return (
    <VerifyEmailPageStyled>
      <VerifyEmailInfo />
      <EmailVerificationRedirect />
    </VerifyEmailPageStyled>
  );
};

export default VerifyEmail;
