import styled from "styled-components/native";

export const GroupItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px;
  margin: 10px 0;
`;

export const FullName = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

export const SectionTitle = styled.Text`
  font-weight: 800;
  font-size: 22px;
  color: #000000;
  margin-top: 25px;
  padding: 0 20px;
`;

export const Avatar = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

export const Letter = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: -1px;
`;

export const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
