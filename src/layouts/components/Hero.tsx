import { HeroStyled } from "./Hero.styled";

const Hero = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroStyled>
      <h1 className="hero-heading">{children}</h1>
      <div className="underline"></div>
    </HeroStyled>
  );
};

export default Hero;
