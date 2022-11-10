import { PostImage, PostText } from "../styles";
import { Alert, View } from "react-native";
import { Loading } from "../components/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { id, title } = route.params;
  console.log(route);
  useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get("https://5c3755177820ff0014d92711.mockapi.io/articles/" + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Не удалось получить статью");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: data.imageUrl }} />
      <PostText>{data.text}</PostText>
    </View>
  );
};
