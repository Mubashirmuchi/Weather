import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
// import { useAppDispatch, useAppSelector } from "@store/hooks";
// import { serach } from "@store/slice/serachslice";
// import { useDebouncedCallback } from "use-debounce";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items:center
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
`;

const HeaderName = styled.h1`
  margin-left: 1rem;
`;
const SearchContainer = styled.div`
  display: flex;
  border: 0px solid lightgrey;
  margin-left: 25px;
  padding: 5px;
  gap: 0.5rem;
`;
const Input = styled.input`
  border: none;
  outline: none;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
`;

const Header = () => {
  const [city, setCity] = useState("");
  const dispatch = useAppDispatch();
  // const data = useAppSelector((store) => store.search);

  const handleSubmit = useDebouncedCallback(async () => {
    if (city === "") {
      return toast.error(`Please enter a city name`);
    }
    if (city.length < 3) {
      return toast.error(`Please enter a valid city name`);
    }

    dispatch(serach(city));
  }, 500);
  return (
    <HeaderContainer>
      <Logo
        src="https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-8.png"
        alt="Logo"
      />
      <HeaderName>Weather</HeaderName>
      <SearchContainer>
        <FaSearch />
        <Input
          placeholder="Serach...."
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={data.loading}>
          Search
        </Button>
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;
