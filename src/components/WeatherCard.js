import React from "react";
import styled from "styled-components";

const Card = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
`;

const Day = styled.h2`
  font-size: 1.4rem;
`;

const Icon = styled.img`
  width: 30%;
`;

const Temperature = styled.h2`
  font-size: 1.4rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

export default ({
  isCelsius,
  the_temp,
  applicable_date,
  weather_state_name,
  weather_state_abbr
}) => (
  <Card>
    <Day>{applicable_date}</Day>
    <Icon
      src={`https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`}
      alt={weather_state_name}
    />
    <Temperature>
      {the_temp}
      {isCelsius ? "°C" : "°F"}
    </Temperature>
    <Description>{weather_state_name}</Description>
  </Card>
);
