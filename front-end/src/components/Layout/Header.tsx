import React from "react";
import styled from "styled-components";

export const Header: React.FC = () => {
  return (
    <Container>
      <div className="header-title">LPL</div>
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

  > * {
    flex: 0;
  }

  > .header-title {
    font-size: 2rem;
  }
`;
