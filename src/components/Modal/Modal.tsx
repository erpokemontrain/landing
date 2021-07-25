import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardContent from '../CardContent';
import Container from '../Container';

export interface ModalProps {
  className?: string;
  onDismiss?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, className }) => {
  return (
    <Container size="sm">
      <StyledModal className={`${className}`}>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </StyledModal>
    </Container>
  );
};

const StyledModal = styled.div`
  border-radius: 12px;
  box-shadow: 24px 24px 48px -24px ${(props) => props.theme.color.grey[900]};
  position: relative;

  .card {
    padding: 24px;
    background: #000;
  }
`;

export default Modal;
