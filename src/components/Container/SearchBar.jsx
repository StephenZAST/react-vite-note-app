import React from "react";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchIcon>
        <IoIosSearch size={20} color="#623CEA" />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Rechercher"
        className="search-input"
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 0.5rem;
`;

const SearchIcon = styled.div`
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
  background-color: transparent;
`;

export default SearchBar;
