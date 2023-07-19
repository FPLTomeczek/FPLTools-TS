import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
`;
const Loading = () => {
  return (
    <LoadingStyled>
      <CircularProgress sx={{ color: "var(--secondary-color)" }} />
    </LoadingStyled>
  );
};

export default Loading;
