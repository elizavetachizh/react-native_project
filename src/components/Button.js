import React from "react";
import styled from "styled-components/native";
import { ButtonText, ButtonWrapper } from "../styles/Button";

const Button = ({ children, color, onPress }) => (
  <ButtonWrapper onPress={onPress} color={color}>
    <ButtonText>{children}</ButtonText>
  </ButtonWrapper>
);

Button.defaultProps = {
  color: "#2a86ff",
};

export default Button;
