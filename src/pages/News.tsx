import NewsList from "../features/news/components/NewsList";
import Hero from "../layouts/components/Hero";
import { NewsPageStyled } from "./Pages.styled";

const News = () => {
  return (
    <NewsPageStyled>
      <Hero>News</Hero>
      <NewsList />
    </NewsPageStyled>
  );
};

export default News;
