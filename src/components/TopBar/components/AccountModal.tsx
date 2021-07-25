import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';

import Label from '../../Label';
import Modal, { ModalProps } from '../../Modal';
import ModalTitle from '../../ModalTitle';
import useStandardProtocol from '../../../hooks/useStandardProtocol';
import TokenSymbol from '../../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const standardProtocol = useStandardProtocol();

  const stndBalance = useTokenBalance(standardProtocol.STND);
  const displaySTNDBalance = useMemo(() => getDisplayBalance(stndBalance), [stndBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <StyledBalance>
            <StyledValue>{displaySTNDBalance}</StyledValue>
            <Label text="RAIL Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`'
background: #000;

  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

const StyledBalanceIcon = styled.div`
  font-size: 36px;
  margin-right: ${(props) => props.theme.spacing[3]}px;
`;

const StyledBalanceActions = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${(props) => props.theme.spacing[4]}px;
`;

export default AccountModal;
