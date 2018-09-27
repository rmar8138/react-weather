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
  text-align: center;
`;

const Header = styled.h1`
  font-size: 6rem;
  animation: ${fadeInUp} 1s ease-in-out;
`;

const Text = styled.p`
  font-size: 3rem;
  animation: ${fadeInUp} 1s ease-in-out 0.5s;
  animation-fill-mode: backwards;
`;

export default () => (
  <Container>
    <Header>React Weather</Header>
    <Text>Search a location to get started!</Text>
  </Container>
);
