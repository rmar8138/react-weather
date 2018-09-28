import React from "react";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  height: 50%;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  animation: ${fadeInUp} 1s ease-in-out;
  padding: 1rem;
`;

const Location = styled.h1`
  font-size: 2.6rem;
  grid-column: 1 / -1;
`;

const Day = styled.h2`
  font-size: 1.6rem;
  grid-column: 1 / -1;
`;

const Icon = styled.img`
  width: 100px;
  justify-self: center;
`;

const Temperature = styled.h2`
  font-size: 3.6rem;
  font-weight: 100;
  justify-self: center;
`;

const Description = styled.p`
  font-size: 1.6rem;
  grid-column: 1 / -1;
`;

export default props => (
  <Container>
    <Location>
      {props.title}, {props.country}
    </Location>
    <Day>{props.weather.applicable_date}</Day>
    <Icon
      src={`https://www.metaweather.com/static/img/weather/${
        props.weather.weather_state_abbr
      }.svg`}
      alt={props.weather.weather_state_name}
    />
    <Temperature>
      {props.weather.the_temp}
      {props.isCelsius ? "°C" : "°F"}
    </Temperature>
    <Description>{props.weather.weather_state_name}</Description>
  </Container>
);
