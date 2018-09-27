import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.form`
  height: 50px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 70%;
  width: 10rem;
  font-size: 1.2rem;
  font-family: "Roboto", sans-serif;
  border: none;
  padding: 2px;
  background-color: white;

  :focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  height: 70%;
  width: 4rem;
  cursor: pointer;
  background-color: inherit;
  color: white;
  font-size: 1rem;
  border: none;
  transition: all 0.2s;

  :hover {
    background-color: #2476ac;
  }

  :focus {
    outline: none;
  }
`;

export default class SearchBar extends Component {
  onSubmit = e => {
    e.preventDefault();

    this.props.searchLocation(e.target.elements.query.value);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Input name="query" type="text" />
          <SearchButton>Search</SearchButton>
        </Form>
      </div>
    );
  }
}
