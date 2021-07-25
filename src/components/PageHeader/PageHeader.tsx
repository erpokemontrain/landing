import React from 'react';
import styled from 'styled-components';

interface PageHeaderProps {
  icon?: React.ReactNode;
  subtitle?: string;
  title?: string;
  img?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ img, icon, subtitle, title }) => {
  return (
    <StyledPageHeader>
      {img && <img src={img} />}
      {!img && <StyledIcon>{icon}</StyledIcon>}
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledPageHeader>
  );
};

const StyledPageHeader = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  max-width: 512px;
  width: 100%;
  margin: 0 auto;

  img {
    width: 300px;
    margin-bottom: 12px;
    text-shadow
  }
`;

const StyledIcon = styled.div`
  font-size: 96px;
  height: 96px;
  line-height: 96px;
  text-align: center;
  width: 96px;
`;

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.color.grey[100]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const StyledSubtitle = styled.h3`
  color: #ed1e79;
  // color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default PageHeader;
