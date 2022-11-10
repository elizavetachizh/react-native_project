import {
  PostImage,
  PostView,
  PostDetails,
  PostTitle,
  PostDate,
} from "../styles";
export default function Post({ title, imageUrl, createdAt }) {
  return (
    <PostView>
      <PostImage source={{ uri: imageUrl }} />
      <PostDetails>
        <PostTitle>{title}</PostTitle>
        <PostDate>{new Date(createdAt).toLocaleDateString()}</PostDate>
      </PostDetails>
    </PostView>
  );
}
