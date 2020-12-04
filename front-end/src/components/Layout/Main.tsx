import React from "react";
import styled from "styled-components";

export const Main: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
