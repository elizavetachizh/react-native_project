import styled from "styled-components/native";

export const ButtonWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${props => props.color};
  height: 45px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 16px;
`;

export const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
  padding: 0 15px;
`;
