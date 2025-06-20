import React from 'react';
import styled from 'styled-components';
import homeimg from '../assets/images/homeimg.svg';
import trustpilotLight from '../assets/images/trustpilot-logo.svg';
import trustpilotDark from '../assets/images/trustpilot-logo-dark.svg';
import { useNavigate } from 'react-router-dom';
import '../styles/main.scss'
import { ThemeContext } from '../context/Theme';
import type { HomeProps } from '../types/types';

export const Wrapper = styled.div`
  padding: 10em 0;
  display: flex;
  justify-content: center;
`;

export const Grid = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.div`
  flex: 1;
`;

export const Heading = styled.h1`
  font-size: 3.4em;
  color: ${({ theme }) => theme.text};
  line-height: 1.2em;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.accent};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.muted};
  line-height: 1.8em;
  font-weight: 100;
  letter-spacing: 0.05em;
  margin: 1em 0 2em;
  width: 90%;
`;

export const StyledButton = styled.button`
  padding: 1em 2.5em;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: 0.1em solid ${({ theme }) => theme.accent};
  margin-top: 1em;
  font-size: 1em;
  font-weight: 100;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  border-radius: 0.4em;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover || '#2ca2a7'};
  }
`;

export const ReviewScore = styled.div`
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3em;
`;

export const TrustLogo = styled.span`
  .tplogo {
    width: 120px;
    height: auto;
  }
`;

export const Rating = styled.span`
  color: ${({ theme }) => theme.muted};
  font-size: 0.95em;
  line-height: 1.4em;
`;

export const Score = styled.span`
  font-weight: 100;
  color: ${({ theme }) => theme.accent};
`;

export const Right = styled.div`
  flex: 1;
  position: relative;
`;

export const FoodImage = styled.img`
  width: 110%;
  border-radius: 12px;
`;

const Home: React.FC<HomeProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(user ? '/menu' : '/login');
  };

  const { theme } = React.useContext(ThemeContext);

  return (
    <Wrapper>
      <Grid>
        <Left>
          <Heading>
            Beautiful food & takeaway, <Highlight>delivered</Highlight> to your door.
          </Heading>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </Description>
          <StyledButton onClick={handleOrderClick}>Place an Order</StyledButton>
          <ReviewScore>
            <TrustLogo>
            <img src={theme === 'dark' ? trustpilotDark : trustpilotLight} 
            alt="Trustpilot Logo" className="tplogo"/>

            </TrustLogo>
            <Rating>
              <Score>4.8 out of 5</Score> based on 2000+ reviews
            </Rating>
          </ReviewScore>
        </Left>
        <Right>
          <FoodImage src={homeimg} alt="Delicious food on table" />
        </Right>
      </Grid>
    </Wrapper>
  );
};

export default Home;