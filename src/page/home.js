import { Button, Text, View } from "react-native";
import UserScreen from "./Login/showUser";
import { useContext } from "react";
import { CredentialsContext } from "../components/CreadentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const { name, email, phone } = storedCredentials;

  const loadPage = () => {
    navigation.navigate("Test");
  };
  const loadPatientDate = () => {
    navigation.navigate("Patient date");
  };
  const loadPost = () => {
    navigation.navigate("Posts");
  };
  const loadLogin = () => {
    navigation.navigate("Login");
  };

  const clearLogin = () => {
    AsyncStorage.removeItem("appUsers")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <Button title={"Создание новой задачи"} onPress={loadPage} />
      <Button title={"Созданные посты"} onPress={loadPost} />
      <Button title={"Журнал пациентов"} onPress={loadPatientDate} />

      <Text>{email || "email"}</Text>
      <Text>{name || "name"}</Text>
      <Text>{phone || "phone"}</Text>
      {/*<Button title={"Login"} onPress={loadLogin} />*/}
      <Button title={"Logout"} onPress={clearLogin} />
      {/*<Button*/}
      {/*  title={"SignUp"}*/}
      {/*  onPress={() => {*/}
      {/*    navigation.navigate("SignUp");*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<UserScreen />*/}
    </View>
  );
}
