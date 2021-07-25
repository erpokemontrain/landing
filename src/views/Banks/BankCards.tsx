import React from 'react';
import styled from 'styled-components';

import { Bank } from '../../StandardProtocol';
import Button from '../../components/Button';
import Card from '../../components/Card';
// import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useBanks from '../../hooks/useBanks';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';

const BankCards: React.FC = () => {
  const [banks] = useBanks();

  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  let finishedFirstRow = false;
  const inactiveRows = inactiveBanks.reduce<Bank[][]>(
    (bankRows, bank) => {
      const newBankRows = [...bankRows];
      if (newBankRows[newBankRows.length - 1].length === (finishedFirstRow ? 2 : 3)) {
        newBankRows.push([bank]);
        finishedFirstRow = true;
      } else {
        newBankRows[newBankRows.length - 1].push(bank);
      }
      return newBankRows;
    },
    [[]],
  );

  return (
    <StyledCards>
      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have banks where the mining has finished.</b>
            <br />
            Please withdraw and harvest your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeBanks.map((bank, i) => (
          <React.Fragment key={bank.name}>
            <BankCard bank={bank} />
            {i < activeBanks.length - 1 && <StyledSpacer />}
          </React.Fragment>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveBankTitle>Inactive Banks</StyledInactiveBankTitle>
          {inactiveRows.map((bankRow, i) => (
            <StyledRow key={i}>
              {bankRow.map((bank, j) => (
                <React.Fragment key={j}>
                  <BankCard bank={bank} />
                  {j < bankRow.length - 1 && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface BankCardProps {
  bank: Bank;
}

const BankCard: React.FC<BankCardProps> = ({ bank }) => {
  return (
    <StyledCardWrapper>
      {/* {bank.depositTokenName.includes('LP') &&
        (bank.depositTokenName.includes('BAS_DAI') ? (
          <StyledCardSuperAccent />
        ) : (
          <StyledCardAccent />
        ))} */}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <TokenSymbol symbol={bank.depositTokenName} size={54} />
            </CardIcon>
            <StyledTitle>{bank.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {bank.depositTokenName.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {`${bank.earnTokenName}`}</StyledDetail>
            </StyledDetails>
            <Button text="Select" to={`${bank.contract}`} />
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;

  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.025);
  // background: rgba(203, 51, 143, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const CardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  // --border-width: 2px;
  // z-index: 1;
  // position: relative;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // font-family: Lato, sans-serif;
  // font-size: 2.5rem;
  // background: #222;
  // border-radius: 20px;

  // @keyframes movebg {
  //   50% {
  //     background-position: 100% 50%;
  //   }
  // }

  // &::after {
  //   position: absolute;
  //   content: '';
  //   top: calc(-1 * var(--border-width));
  //   left: calc(-1 * var(--border-width));
  //   z-index: -1;
  //   width: calc(100% + var(--border-width) * 2);
  //   height: calc(100% + var(--border-width) * 2);
  //   background: linear-gradient(90deg, rgba(203,51,143,1) 0%, rgba(187,90,205,1) 16%, rgba(236,117,230,1) 31%, rgba(209,128,242,1) 60%, rgba(49,166,244,1) 100%);
  //   background-size: 300% 300%;
  //   background-position: 0 50%;
  //   border-radius: 20px;

  //   animation: movebg 4s alternate infinite;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  padding: ${(props) => props.theme.spacing[4]}px;
  
  // width: 100%;
  // background-color: #000;
  // border-radius: 20px;
  // height: 100%;
  // box-sizing: border-box;
  }
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`;

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveBankTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export default BankCards;
