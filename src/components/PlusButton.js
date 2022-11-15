import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Circle } from "../styles/PlusBtn";

const PlusButton = ({ onPress }) => (
  <Circle onPress={onPress}>
    <Ionicons name="ios-add" size={36} color="white" />
  </Circle>
);

export default PlusButton;
