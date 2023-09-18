import { Link } from "react-router-dom";
import { LoginFormFooterElementStyled } from "./Auth.styled";

type LoginFormFooterElementProps = {
  text: {
    questionText: string;
    linkText: string;
    link: string;
  };
};

const LoginFormFooterElement = ({ text }: LoginFormFooterElementProps) => {
  const { questionText, linkText, link } = text;
  return (
    <LoginFormFooterElementStyled>
      {questionText}
      <Link to={link}>
        <span className="form-footer-element-link__text">{linkText}</span>
      </Link>
    </LoginFormFooterElementStyled>
  );
};

export default LoginFormFooterElement;
