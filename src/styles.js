import styled from "styled-components/native";

export const Text = styled.Text`
  color: red;
`;

export const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

export const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;

export const PostTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

export const PostDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

export const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

export const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;
