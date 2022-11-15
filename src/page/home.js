import { Button, View } from "react-native";

export default function Home({ navigation }) {
  const loadPage = () => {
    navigation.navigate("Test");
  };
  const loadPatientDate = () => {
    navigation.navigate("Patient date");
  };
  const loadPost = () => {
    navigation.navigate("Posts");
  };

  return (
    <View>
      <Button title={"Создание новой задачи"} onPress={loadPage} />
      <Button title={"Созданные посты"} onPress={loadPost} />
      <Button title={"Журнал пациентов"} onPress={loadPatientDate} />
    </View>
  );
}
