import styled from "styled-components";
import Navbar from "./components/Navbar";

const ViewWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  @media screen and (max-width: 1400px) {
    padding: 0 1rem;
  }
`;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <ViewWrapper>{children}</ViewWrapper>
    </>
  );
};

export default DefaultLayout;
