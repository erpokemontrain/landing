import React from 'react';
import styled from 'styled-components';
import './rail.css';

function Rail(props) {
  return (
    <main className={`${props.className}`}>
      <div class="rail__background"></div>
      <div class="rail__rocks_1"></div>
      <div class="rail__rocks_2"></div>
      <div class="rail__rails"></div>
      <div class="rail__train"></div>
      <div class="rail__ground"></div>
    </main>
  );
}

export default React.memo(styled(Rail)`
  color: white;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
`);
