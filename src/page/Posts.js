import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();
  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get("https://5c3755177820ff0014d92711.mockapi.io/articles")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Не удалось получить статьи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
      }
      data={items}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FullPost", {
              id: item.id,
              title: item.title,
            })
          }
        >
          <Post
            title={item.title}
            imageUrl={item.imageUrl}
            createdAt={item.createdAt}
          />
        </TouchableOpacity>
      )}
    />
  );
}
