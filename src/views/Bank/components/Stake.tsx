import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Bank } from '../../../StandardProtocol';

interface StakeProps {
  bank: Bank;
}

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract);

  const { onStake } = useStake(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={bank.depositTokenName} height={64} />
            </CardIcon>
            <Value value={getDisplayBalance(stakedBalance, bank.depositToken.decimal)} />
            <Label text={`${bank.depositTokenName} Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  approveStatus == ApprovalState.PENDING ||
                  approveStatus == ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`Approve ${bank.depositTokenName}`}
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw} className="stake__iconbtn">
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton
                  className="stake__iconbtn"
                  disabled={bank.finished}
                  onClick={() => (bank.finished ? null : onPresentDeposit())}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;

  .stake__iconbtn {
    border-radius: 12px;
    background: #222222;
    transition: all 0.5s ease-in;
    .addicon__path2 {
      fill: #9090ff;
    }
    .rmvicon__path2 {
      fill: #9090ff;
    }

    &:hover {
      background: #9090ff;
      .addicon__path2 {
        fill: #222222;
      }
      .rmvicon__path2 {
        fill: #222222;
      }
    }
  }
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  padding: 24px;
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
