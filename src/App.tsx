import React, { useEffect, useState, useCallback } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import { formatMoney } from './helpers/functions'

import {
  ArrowRight,
  ArrowLeft,
  Card,
  InputContent,
  InputWrapper,
  Button,
  CardAmountInfo,
  CardAmountRow,
  CardAmountValue,
  CardAmountValueNumber,
  CardAmountValueText,
  CardInputsRow,
  CardSubTitle,
  CardTitle,
  CardTitleRow,
  Container,
  Content,
  DateInput,
  Header,
  House,
  Input,
  InputContainer,
  Logo,
  Title,
  Year
} from './components/index'

import arrow  from './icons/arrow.svg'
import logo  from './icons/logo.svg';
import house from './icons/house.svg';

const App: React.FunctionComponent = () => {
  const today = new Date();
  const defaultDate = new Date(today.setMonth(today.getMonth() + 1));
  const [selectedPeriod, setSelectedPeriod] = useState(defaultDate);
  const [amount, setAmount] = useState('0.00');
  const [monthlyAmountModifier, setMonthlyAmountModifier] = useState(1);

  const onChangeEventKeyDown = useCallback(() => {
    document.addEventListener('keydown', event => handleKeyDown(event));
  }, [])
  
  const setModifier = (date: Date): void => { 
    const today = new Date();
    
    const monthSelected = date.getMonth()
    const monthModifier = today.getMonth();
    const monthVariaton = monthSelected - monthModifier

    const yearSelected = date.getFullYear()
    const yearModifier = today.getFullYear();
    const yearVariation = (yearSelected - yearModifier) * 12

    return setMonthlyAmountModifier( monthVariaton + yearVariation)
  }

  const onPeriodChange = (date: Date): void => {
    if (date >= defaultDate) {
      setModifier(date)
      return setSelectedPeriod(date);
    }
    return setSelectedPeriod(defaultDate)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 39: return handleArrowClick(+1);
      case 37: return handleArrowClick(-1);
      default: return undefined
    }
  };
  
  const handleArrowClick = (amount: number) => {
    const today = new Date();
    const avancedDate = new Date(today.setMonth(today.getMonth() + 1));

    const newDateValue = new Date(
      selectedPeriod.setMonth(selectedPeriod.getMonth() + amount)
    );

    if (newDateValue < avancedDate) {
      setMonthlyAmountModifier(1)
      return setSelectedPeriod(defaultDate)
    };
    setModifier(newDateValue)
    return setSelectedPeriod(newDateValue);
  };


  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = event;
    const numberToMoney = formatMoney(value)
    setAmount(numberToMoney)
  }

  const monthlyAmount = (): string => {
    const amountNumber = Number(amount.replace(/\D/g, ''))
    const monthlyValue = (amountNumber / (monthlyAmountModifier*100)).toFixed(2)
    return formatMoney(monthlyValue)
  }

  const arrowLeftAvailable = () => {
    if (monthlyAmountModifier >= 2) return true
    return false
  }

  useEffect(() => { 
    onChangeEventKeyDown();
    return () => {
      onChangeEventKeyDown();
    };

  }, [onChangeEventKeyDown])

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="logo"/>
      </Header>
      <Content>
        <Title>Let's plan your <strong>saving goal.</strong></Title>
        <Card>
          <CardTitleRow>
            <House src={house} alt="house"/>
            <CardTitle>Buy a house</CardTitle>
            <CardSubTitle>Saving goal</CardSubTitle>
          </CardTitleRow>
          <CardInputsRow>
            <InputContainer>
              <span>Total amount</span>
              <InputWrapper>
                <InputContent>$</InputContent>
                <Input 
                  data-testid="amountValue"
                  inputMode="numeric"
                  type="text"
                  onChange={onAmountChange}
                  value={amount}
                />
              </InputWrapper>
            </InputContainer>
            <InputContainer>
              <span>Reach goal by</span>
              <InputWrapper data-testeid="inputWrapper">
                <ArrowLeft data-testid="arrowLeft" onClick={() => handleArrowClick(-1)} isAvailable={arrowLeftAvailable()}>
                    <img src={arrow} alt="arrow-left"/>
                  </ArrowLeft>
                <DatePicker
                  data-testid="datePicker"
                  onChange={onPeriodChange}
                  showMonthYearPicker
                  customInput={
                    <DateInput>
                      {selectedPeriod.toLocaleString('en-US', { month: 'long' })}
                      <Year>{selectedPeriod.getFullYear()}</Year>
                    </DateInput>
                  }
                />
                <ArrowRight data-testid="arrowRight" onClick={() => handleArrowClick(1)}>
                  <img src={arrow} alt="arrow-right"/>
                </ArrowRight>
              </InputWrapper>
            </InputContainer>
          </CardInputsRow>
          <CardAmountRow>
              <CardAmountValue>
                <CardAmountValueText>Monthly amount</CardAmountValueText>
                <CardAmountValueNumber data-testid="montlyAmountText">${monthlyAmount()}</CardAmountValueNumber>
              </CardAmountValue>
            <CardAmountInfo data-testid="summary">You're planning <strong>{monthlyAmountModifier} monthly deposits</strong> to reach your <strong>$ {amount}</strong> goal by <strong>{`${(selectedPeriod).toLocaleString('en-US', { month: 'long' })} ${selectedPeriod.getFullYear()}`}</strong></CardAmountInfo>
          </CardAmountRow>
          <Button>Confirm</Button>
        </Card>
      </Content>
    </Container>
    );
};

export default App;
