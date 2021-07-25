import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

function Countdown(props) {
  const [date, setDate] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      const date = calculateCountdown(props.date);
      date ? setDate(date) : stop();
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const stop = () => {
    clearInterval(timer.current);
  };

  const calculateCountdown = (endDate) => {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  };

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  };

  return (
    date && (
      <div className={`${props.className} countdown`}>
        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong>{addLeadingZeros(date.days)}</strong>
            <span className="countdown-unit">{date.days === 1 ? 'Day' : 'Days'}</span>
          </span>
        </span>

        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong>{addLeadingZeros(date.hours)}</strong>
            <span className="countdown-unit">Hours</span>
          </span>
        </span>

        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong>{addLeadingZeros(date.min)}</strong>
            <span className="countdown-unit">Min</span>
          </span>
        </span>

        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong>{addLeadingZeros(date.sec)}</strong>
            <span className="countdown-unit">Sec</span>
          </span>
        </span>
      </div>
    )
  );
}

export default React.memo(styled(Countdown)`
  font-size: 28px;
  width: 100%;
  display: flex;
  color: #fff;
  margin-bottom: 32px; 
  justify-content: center;
  animation fadein 1.5s forwards;


  .countdown-col {
    margin: 0 6px;
    display: inline-block;
  }

  .countdown-col-element {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  strong {
    padding: 12px;
    border-radius: 12px;
    font-size: 64px;
    flex: 1 1 0;
    text-align: center;
    box-sizing: border-box;
  }
`);
