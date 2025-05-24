import React from 'react';
import styled from 'styled-components';
import homeimg from '../assets/images/homeimg.svg';
import trustpilot from '../assets/images/trustpilot-logo.svg';

const Wrapper = styled.div`
  padding: 10em 0;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
`;

const Heading = styled.h1`
  font-size: 3.4em;
  color: #2e2e2e;
  line-height: 1.2em;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const Highlight = styled.span`
  color: #35B8BE;
`;

const Description = styled.p`
  color: #546285;
  line-height: 1.8em;
  font-weight: 100;
  letter-spacing: 0.05em;
  margin: 1em 0 2em;
  width: 90%;
`;

const StyledButton = styled.button`
  padding: 1em 2.5em;
  background-color: #35B8BE;
  color: white;
  border: 0.1em solid #35B8BE;
  margin-top: 1em;
  font-size: 1em;
  font-weight: 100;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  border-radius: 0.4em;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2ca2a7;
  }
`;

const ReviewScore = styled.div`
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3em;
`;

const TrustLogo = styled.span`
  .tplogo {
    width: 120px;
    height: auto;
  }
`;

const Rating = styled.span`
  color: #546285;
  font-size: 0.95em;
  line-height: 1.4em;
`;

const Score = styled.span`
  font-weight: 100;
  color: #35B8BE;
`;

const Right = styled.div`
  flex: 1;
  position: relative;
`;

const FoodImage = styled.img`
  width: 110%;
  border-radius: 12px;
`;

const Home = () => {
  return (
    <Wrapper>
      <Grid>
        <Left>
          <Heading>
            Beautiful food & takeaway, <Highlight>delivered</Highlight> to your door.
          </Heading>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Description>
          <StyledButton>
            Place an Order
          </StyledButton>
          <ReviewScore>
            <TrustLogo>
              <img src={trustpilot} alt="Trustpilot Logo" className="tplogo" />
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
