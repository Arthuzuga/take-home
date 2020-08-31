import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #f2f2f2;
  position: relative;
  overflow-x: hidden;
`;

export const Header = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  padding: 13px 0 17px 16px;
  @media screen and (min-width: 860px) {
    padding: 17px 0 24px 37px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: normal;
  position: relative;
`;

export const Title = styled.h1`
  position: absolute;
  width: 328px;
  height: 26px;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  letter-spacing: -0.2px;
  color: #1b31a8;

  strong {
    font-weight: bold;
  }

  @media screen and (min-width: 860px) {
    font-size: 18px;
    width: 642px;
    height: 32px;
    left: 30.56%;
    right: 30.56%;
  }
`;

export const Card = styled.div`
  position: absolute;
  left: 0px;
  top: 70px;
  height: 690px;
  background: #ffffff;
  border: 1px solid #e1e8ed;
  box-shadow: 0px 1px 4px rgba(150, 164, 176, 0.1);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 860px) {
    padding: 40px;
    width: 560px;
    height: 600px;
    left: 30.56%;
    right: 30.56%;
    bottom: 8.41%;
  }
`;

export const Logo = styled.img`
  width: 65px;

  @media screen and (min-width: 860px) {
    width: 95px;
  }
`;

export const Icon = styled.img`
  width: 32px;
  height: 32px;

  @media screen and (min-width: 860px) {
    width: 40px;
    height: 40px;
  }
`;

export const CardTitleRow = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const CardTitle = styled.h2`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.266667px;
  color: #1c1e1f;
  margin: 4px 0 2px 0;
`;
export const CardSubTitle = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: #657786;
`;
export const CardInputsRow = styled.div`
  position: absolute;
  top: 180px;
  left: 24px;
  right: 24px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 860px) {
    flex-direction: row;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #1c1e1f;
  width: 100%;
  margin-top: 8px;
  @media screen and (min-width: 860px) {
    width: 45%;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  .react-datepicker-wrapper {
    width: 100%;
  }
  @media screen and (min-width: 860px) {
    .react-datepicker-wrapper {
      width: auto;
    }
  }
`;
export const InputContent = styled.div`
  width: 15%;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.183333px;
  color: #657786;
  background: #f4f8fa;
  border: 1px solid #e1e8ed;
  box-sizing: border-box;
  border-radius: 4px 0px 0px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (min-width: 860px) {
    width: 25%;
  }
`;

export const ArrowLeft = styled.div<{ isAvailable: boolean }>`
  width: 15%;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.183333px;
  color: #657786;
  background: #f4f8fa;
  border: 1px solid #e1e8ed;
  box-sizing: border-box;
  border-radius: 4px 0px 0px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'not-allowed')};
  @media screen and (min-width: 860px) {
    width: 25%;
  }
`;
export const ArrowRight = styled.div`
  transform: rotate(180deg);
  width: 15%;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.183333px;
  color: #657786;
  background: #f4f8fa;
  border: 1px solid #e1e8ed;
  box-sizing: border-box;
  border-radius: 4px 0px 0px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (min-width: 860px) {
    width: 25%;
  }
`;

export const Input = styled.input`
  width: 85%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #e1e8ed;
  box-sizing: border-box;
  padding: 16px;
  font-size: 20px;
  -webkit-appearance: none;
  border-radius: 0px 4px 4px 0px;
  @media screen and (min-width: 860px) {
    width: 75%;
  }
`;
export const DateInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 14.5rem; */
  height: 56px;
  background: #ffffff;
  border: 1px solid #e1e8ed;
  box-sizing: border-box;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.166667px;
  color: #1c1e1f;
  @media screen and (min-width: 860px) {
    width: 136px;
  }
`;

export const Year = styled.span`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #1c1e1f;
`;

export const CardAmountRow = styled.div`
  position: absolute;
  top: 380px;
  left: 24px;
  right: 24px;
  background: #ffffff;
  border: 1px solid #e1e8ed;
  box-shadow: 0px 1px 4px rgba(150, 164, 176, 0.1);
  border-radius: 4px;

  & div {
    padding: 24px;

    @media (min-width: 860px) {
      padding: 32px;
    }
  }
  @media (min-width: 860px) {
    top: 300px;
  }
`;

export const CardAmountValue = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #1c1e1f;
  word-break: normal;
  @media (min-width: 860px) {
    font-size: 18px;
  }
`;
export const CardAmountValueText = styled.span`
  width: 64px;
`;
export const CardAmountValueNumber = styled.span`
  font-weight: 500;
  font-size: 26px;
  line-height: 32px;
  text-align: center;
  letter-spacing: -0.266667px;
  color: #0079ff;
  text-align: right;
  word-break: break-all;

  @media (min-width: 860px) {
    font-size: 40px;
  }
`;
export const CardAmountInfo = styled.div`
  background: #f4f8fa;
  font-size: 12px;
  line-height: 16px;
  color: #1c1e1f;
`;

export const Button = styled.button<{
  isAbsolute?: boolean;
  customFontSize?: string;
  customWidth?: string;
}>`
  width: ${({ customWidth }) => customWidth || '80%'};
  background-color: #1b31a8;
  color: #ffffff;
  border-radius: 32px;
  padding: 16px;
  font-weight: 600;
  font-size: ${({ customFontSize }) => customFontSize || '18px'};
  line-height: 24px;
  border: none;
  cursor: pointer;
  position: ${({ isAbsolute }) => isAbsolute && 'absolute'};
  bottom: 24px;

  @media screen and (min-width: 860px) {
    bottom: 49px;
  }
`;
