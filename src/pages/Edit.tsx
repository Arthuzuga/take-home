import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Title,
  Card,
  CardTitleRow,
  Icon,
  CardTitle,
  CardSubTitle,
  CardInputsRow,
  InputContainer,
  InputWrapper,
  InputContent,
  Input,
  ArrowLeft,
  DateInput,
  ArrowRight,
  CardAmountRow,
  CardAmountValue,
  CardAmountValueText,
  CardAmountValueNumber,
  Button,
  Year,
  CardAmountInfo
} from '../components/index';

import { formatMoney } from '../helpers/functions';

import arrow from '../icons/arrow.svg';

const Edit: React.FunctionComponent = () => {
  const history = useHistory();
  const match = useParams();
  const today = new Date();
  const defaultDate = new Date(today.setMonth(today.getMonth() + 1));
  const [selectedPeriod, setSelectedPeriod] = useState(defaultDate);
  const [amount, setAmount] = useState('0.00');
  const [monthlyAmountModifier, setMonthlyAmountModifier] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [icon, setIcon] = useState('');
  const [title, setTitle] = useState('');
  const [savingArray, setSavingArray] = useState([]);

  const setModifier = (date: Date): void => {
    const today = new Date();

    const monthSelected = date.getMonth();
    const monthModifier = today.getMonth();
    const monthVariaton = monthSelected - monthModifier;

    const yearSelected = date.getFullYear();
    const yearModifier = today.getFullYear();
    const yearVariation = (yearSelected - yearModifier) * 12;

    return setMonthlyAmountModifier(monthVariaton + yearVariation);
  };

  const onPeriodChange = (date: Date): void => {
    if (date >= defaultDate) {
      setModifier(date);
      return setSelectedPeriod(date);
    }
    return setSelectedPeriod(defaultDate);
  };

  const handleArrowClick = (amount: number) => {
    const today = new Date();
    const avancedDate = new Date(today.setMonth(today.getMonth() + 1));

    const newDateValue = new Date(
      selectedPeriod.setMonth(selectedPeriod.getMonth() + amount)
    );

    if (newDateValue < avancedDate) {
      setMonthlyAmountModifier(1);
      return setSelectedPeriod(defaultDate);
    }
    setModifier(newDateValue);
    return setSelectedPeriod(newDateValue);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 39:
        return handleArrowClick(+1);
      case 37:
        return handleArrowClick(-1);
      default:
        return undefined;
    }
  };

  const onChangeEventKeyDown = useCallback(() => {
    document.addEventListener('keydown', event => handleKeyDown(event));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = event;
    const numberToMoney = formatMoney(value);
    setAmount(numberToMoney);
  };

  const monthlyAmount = (): string => {
    const amountNumber = Number(amount.replace(/\D/g, ''));
    const monthlyValue = (amountNumber / (monthlyAmountModifier * 100)).toFixed(
      2
    );
    return formatMoney(monthlyValue);
  };

  const arrowLeftAvailable = () => {
    if (monthlyAmountModifier >= 2) return true;
    return false;
  };

  useEffect(() => {
    if (match) {
      const { id } = match;
      const res = localStorage.getItem('savingCardsArray');
      const savingCardsArray = JSON.parse(res);
      const selectedCard = savingCardsArray.filter(card => card.id === id);
      const { label, icon } = selectedCard[0];
      setSavingArray(savingCardsArray);
      setTitle(label);
      setIcon(icon);
      setLoading(false);
    }
  }, [match]);

  useEffect(() => {
    onChangeEventKeyDown();
    return () => {
      onChangeEventKeyDown();
    };
  }, [onChangeEventKeyDown]);

  const onSubmit = () => {
    const newArray = savingArray.map(card => {
      if (card.id === match.id) {
        return {
          amount: `$ ${amount}`,
          icon: card.icon,
          id: card.id,
          label: card.label,
          period: `${selectedPeriod.toLocaleString('en-US', {
            month: 'long'
          })} ${selectedPeriod.getFullYear()}`,
          status: 'ready'
        };
      }
      return card;
    });
    localStorage.setItem('savingCardsArray', JSON.stringify(newArray));
    history.push('/');
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Title>
        {"Let's plan your"} <strong>saving goal.</strong>
      </Title>
      <Card>
        <CardTitleRow>
          <Icon src={icon} alt={match.id} />
          <CardTitle>{title}</CardTitle>
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
              <ArrowLeft
                data-testid="arrowLeft"
                onClick={() => handleArrowClick(-1)}
                isAvailable={arrowLeftAvailable()}
              >
                <img src={arrow} alt="arrow-left" />
              </ArrowLeft>
              <DatePicker
                data-testid="datePicker"
                onChange={onPeriodChange}
                showMonthYearPicker
                customInput={
                  <DateInput>
                    {selectedPeriod.toLocaleString('en-US', {
                      month: 'long'
                    })}
                    <Year>{selectedPeriod.getFullYear()}</Year>
                  </DateInput>
                }
              />
              <ArrowRight
                data-testid="arrowRight"
                onClick={() => handleArrowClick(1)}
              >
                <img src={arrow} alt="arrow-right" />
              </ArrowRight>
            </InputWrapper>
          </InputContainer>
        </CardInputsRow>
        <CardAmountRow>
          <CardAmountValue>
            <CardAmountValueText>Monthly amount</CardAmountValueText>
            <CardAmountValueNumber data-testid="montlyAmountText">
              ${monthlyAmount()}
            </CardAmountValueNumber>
          </CardAmountValue>
          <CardAmountInfo data-testid="summary">
            {"You're planning "}
            <strong>{monthlyAmountModifier} monthly deposits</strong> to reach
            your <strong>$ {amount}</strong> goal by{' '}
            <strong>{`${selectedPeriod.toLocaleString('en-US', {
              month: 'long'
            })} ${selectedPeriod.getFullYear()}`}</strong>
          </CardAmountInfo>
        </CardAmountRow>
        <Button isAbsolute onClick={onSubmit}>
          Confirm
        </Button>
      </Card>
    </>
  );
};

export default Edit;
