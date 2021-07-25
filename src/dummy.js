import styled from 'styled-components';
import Home from 'Components/NewPageComponents/Home';
import React from 'react';

function NewPage(props) {
  return (
    <main className={`${props.className}`}>
      <Home />
    </main>
  );
}

export default React.memo(styled(NewPage)`
  padding: 20px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(180deg, #c6137f 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(117.81deg, #31a6f4 6.68%, rgba(255, 255, 255, 0) 90.44%), #f1f4f9;
  width: 100%;
  height: 100%;
`);
