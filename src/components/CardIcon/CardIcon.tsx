import React from 'react';
import styled from 'styled-components';

interface CardIconProps {
  children?: React.ReactNode;
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon className="card-icon">{children}</StyledCardIcon>
);

const StyledCardIcon = styled.div`
  font-size: 36px;
  border-radius: 40px;
  align-items: center;
  max-height: 80px;
  display: inline-flex;
  justify-content: center;
  margin: 0 auto ${(props) => props.theme.spacing[3]}px;
`;

export default CardIcon;
