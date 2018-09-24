import React from "react";
import styled from "styled-components";
import Skycons from "react-skycons";

const Card = styled.div`
  height: 100%;
  width: 100%;
`;

export default ({ icon, temperatureHigh, temperatureLow, time }) => (
  <Card>
    <h2>{time}</h2>
    <Skycons color="black" icon={icon} autoplay />
    <h3>{temperatureHigh}</h3>
    <h3>{temperatureLow}</h3>
  </Card>
);
