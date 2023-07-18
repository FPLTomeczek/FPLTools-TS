import styled from "styled-components";

const Hero = ({ text }: { text: string }) => {
  return (
    <HeroStyled>
      <h1 className="hero-heading">{text}</h1>
      <div className="underline"></div>
    </HeroStyled>
  );
};

const HeroStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  .underline {
    width: 100%;
    height: 5px;
    background-color: var(--secondary-color);
  }
`;

export default Hero;
