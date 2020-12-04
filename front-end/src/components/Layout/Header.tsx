import React from "react";
import styled from "styled-components";

export const Header: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  return (
    <Container>
      <div className="header-title">LPL</div>
      <button className="toggle-theme-button" onClick={toggleTheme}></button>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 70px;

  display: flex;
  align-items: center;

  padding: 0 20px;

  box-sizing: border-box;

  background-color: ${({ theme }) => theme.header.background};

  > * {
    flex: 0;
  }

  > .header-title {
    font-size: 2rem;
    color: ${({ theme }) => theme.header.title};
  }

  > .toggle-theme-button {
    width: 50px;
    height: 20px;
  }
`;
