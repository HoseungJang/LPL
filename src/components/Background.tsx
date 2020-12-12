import React from "react";
import styled from "styled-components";

export const Background: React.FC<{ imageURL: string }> = ({ imageURL }) => {
  return <Container imageURL={imageURL} />;
};

const Container = styled.div<{ imageURL: string }>`
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 0;

  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.imageURL});
  background-position: center;
  background-size: cover;

  filter: blur(8px) opacity(0.8);
  -webkit-filter: blur(8px) opacity(0.8);
`;
