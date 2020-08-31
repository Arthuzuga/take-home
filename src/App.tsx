import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Content, Header, Logo } from './components/index';
import { Home, Edit } from './pages';

import { SavingsArray } from './types';

import logo from './icons/logo.svg';
import house from './icons/house.svg';
import academy from './icons/academy.svg';
import vacation from './icons/vacation.svg';
import car from './icons/car.svg';
import wedding from './icons/wedding.svg';
import baby from './icons/baby.svg';
import emergency from './icons/emergency.svg';

const App: React.FunctionComponent = () => {
  const mockSavings: SavingsArray = [
    {
      id: 'college',
      icon: academy,
      label: 'Go to college',
      status: 'setup',
      amount: '',
      period: ''
    },
    {
      id: 'vacation',
      icon: vacation,
      label: 'Take a vacation',
      status: 'setup',
      amount: '',
      period: ''
    },
    {
      id: 'car',
      icon: car,
      label: 'Buy a car',
      status: 'setup',
      amount: '',
      period: ''
    },
    {
      id: 'wedding',
      icon: wedding,
      label: 'Throw a wedding party',
      status: 'setup',
      amount: '',
      period: ''
    },
    {
      id: 'emergency',
      icon: emergency,
      label: 'Build an emergency fund',
      status: 'setup',
      amount: '',
      period: ''
    },
    {
      id: 'baby',
      icon: baby,
      label: 'Have a baby',
      status: 'setup',
      amount: '',
      period: ''
    },
    {
      id: 'house',
      icon: house,
      label: 'Buy a House',
      status: 'setup',
      amount: '',
      period: ''
    }
  ];

  useEffect(() => {
    const res = localStorage.getItem('savingCardsArray');
    if (res === null || res === undefined) {
      localStorage.setItem('savingCardsArray', JSON.stringify(mockSavings));
    }
  }, [mockSavings]);

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo" />
      </Header>
      <Content>
        <BrowserRouter>
          <Switch>
            <Route path="/edit/:id" component={Edit} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Content>
    </Container>
  );
};

export default App;
