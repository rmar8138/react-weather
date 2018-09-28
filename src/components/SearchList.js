import React, { Component } from "react";
import styled from "styled-components";
import shortid from "shortid";

const List = styled.ul`
  list-style: none;
  height: 300px;
  width: 14rem;
  font-size: 1.2rem;
  overflow: scroll;
  position: absolute;
  right: 1rem;
  top: 100%;
  z-index: 1;
`;

const ListItem = styled.li`
  padding: 1rem;
  border: 1px solid black;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all 0.2s;

  :hover {
    border-left: 2px solid #2476ac;
  }
`;

export default class SearchList extends Component {
  onClick = e => {
    this.props.clickSearchItem(e.target.getAttribute("data-value"));
  };

  render() {
    return (
      <List>
        {this.props.searchResults.map(result => {
          console.log(result);
          return (
            <ListItem
              key={shortid.generate()}
              data-value={result.title}
              onClick={this.onClick}
              id="searchItem"
            >
              {result.title}
            </ListItem>
          );
        })}
      </List>
    );
  }
}
