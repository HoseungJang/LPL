import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import { Color } from "../constants/color";

export const Background: React.FC<{ imageURL: string | null }> = ({ imageURL }) => {
  return (
    <Container className={classNames({ "image-background": !!imageURL })} imageURL={imageURL} />
  );
};

const Container = styled.div<{ imageURL: string | null }>`
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 0;

  width: 100%;
  height: 100%;

  background-color: ${Color.LightBlack};

  &.image-background {
    background-image: url(${(props) => props.imageURL});
    background-position: center;
    background-size: cover;

    -webkit-filter: blur(5px) contrast(50%) grayscale(50%);
    filter: blur(5px) contrast(50%) grayscale(50%);

    opacity: 0.5;
  }
`;
