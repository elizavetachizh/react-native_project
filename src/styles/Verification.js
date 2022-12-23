import styled from "styled-components/native";

export const CodeInputsection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 30px;
`;
export const HiddenText = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

export const CodeInputContainer = styled.Pressable`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
`;

export const CodeInput = styled.View`
  min-width: 15%;
  border-width: 2px;
  border-radius: 5px;
  padding: 12px;
`;

export const CodeInputText = styled.Text`
  text-align: center;
  font-size: 22px;
  color: brown;
`;
export const CodeInputFocus = styled(CodeInput)`
  border-color: #6d28d9;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  width: 100%;
`;
