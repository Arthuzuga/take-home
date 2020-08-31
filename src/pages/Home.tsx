import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Icon } from '../components';

import { SavingsItem } from '../types';

type SavingsCardProps = {
  item: SavingsItem;
  onClick: (id: string) => void;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 26px 16px;
  @media screen and (min-width: 860px) {
    padding: 57px 152px;
  }
`;

const Title = styled.h1`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: #1c1e1f;
  margin: 0;
  padding: 0;
`;

const CardsRow = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  @media screen and (min-width: 860px) {
    margin-left: -25px;
  }
`;

const Card = styled.div`
  background: #ffffff;
  position: relative;
  border: 1px solid #e1e8ed;
  box-shadow: 0px 4px 8px rgba(150, 164, 176, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 9px 24px;
  margin: 12px 2px;
  width: 34%;

  @media screen and (min-width: 860px) {
    padding: 32px 40px;
    margin: 12px 2%;
    width: 15%;
  }
`;

const CardLabel = styled.span<{ customMargin: string }>`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #1c1e1f;
  margin: ${({ customMargin }) => customMargin};
`;

const CardAmount = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 22px;
  text-align: center;
  color: #1b31a7;
`;
const CardSupportText = styled.span`
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 17px;
  text-align: center;
  color: #4c4c4c;
`;
const CardPeriod = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #464646;
`;

const SavingsCard: React.FunctionComponent<SavingsCardProps> = ({
  item,
  onClick
}) => {
  const { label, amount, period, status, icon, id } = item;

  const setMargin = () => {
    return status === 'setup' ? '0 0 28px 0' : '0';
  };

  return (
    <Card>
      <Icon src={icon} alt={id} />
      <CardLabel customMargin={setMargin()}>{label}</CardLabel>
      {status === 'setup' ? (
        <Button
          customFontSize="16px"
          customWidth="100%"
          onClick={() => onClick(id)}
        >
          Start setup
        </Button>
      ) : (
        <>
          <CardAmount>{amount}</CardAmount>
          <CardSupportText>reach your goal by</CardSupportText>
          <CardPeriod>{period}</CardPeriod>
        </>
      )}
    </Card>
  );
};

const Home: React.FunctionComponent = () => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [savingCards, setSavingCards] = useState([]);

  useEffect(() => {
    const res = localStorage.getItem('savingCardsArray');
    if (JSON.parse(res).length) {
      setSavingCards(JSON.parse(res));
      setLoading(false);
    }
  }, []);

  const handleCardSelection = (id: string) => history.push(`/edit/${id}`);

  if (isLoading) {
    return (
      <Container>
        <span>Loading...</span>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        <strong>{`Here’s your saving goals!`}</strong>
      </Title>
      <CardsRow>
        {savingCards.map(item => (
          <SavingsCard
            item={item}
            key={item.id}
            onClick={handleCardSelection}
          />
        ))}
      </CardsRow>
    </Container>
  );
};

export default Home;
