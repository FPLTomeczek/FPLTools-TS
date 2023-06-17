import ListButtons from "./ListButtons";
import { ListProps } from "../types/list";
import styled from "styled-components";

const PageController = ({ setPage, page, numOfPages }: ListProps) => {
  return (
    <Wrapper>
      <ListButtons setPage={setPage} numOfPages={numOfPages} page={page} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: end;
  gap: 1rem;
  p {
    font-size: 1rem;
  }
`;

export default PageController;
