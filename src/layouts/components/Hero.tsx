import { HeroStyled } from "./Hero.styled";

const Hero = ({ text }: { text: string }) => {
  return (
    <HeroStyled>
      <h1 className="hero-heading">{text}</h1>
      <div className="underline"></div>
    </HeroStyled>
  );
};

export default Hero;
