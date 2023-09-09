import styled from "styled-components";
import Navbar from "./components/Navbar";

const AuthView = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 1rem;
  @media screen and (max-width: 1400px) {
    padding: 0 1rem;
    padding-bottom: 1rem;
  }
`;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <AuthView>{children}</AuthView>
    </>
  );
};

export default AuthLayout;
