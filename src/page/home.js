import { Button, Text, View } from "react-native";
import {useCallback, useContext, useEffect, useState} from "react";
import { CredentialsContext } from "../components/CreadentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SMS from "expo-sms";

export default function Home({ navigation }) {
  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const { email, phone } = storedCredentials;

  const loadPage = () => {
    navigation.navigate("Test");
  };
  const loadPatientDate = () => {
    navigation.navigate("Patient date");
  };
  const loadPost = () => {
    navigation.navigate("Posts");
  };

  const clearLogin = () => {
    AsyncStorage.removeItem("appUsers")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  const [smsAvailable, setSmsAvailable] = useState(false);

  const onComposeSms = useCallback(async () => {
    if (smsAvailable) {
      console.log("going for it!");
      await SMS.sendSMSAsync(
        "+375444640092",
        "This is my precomposed message!"
      );
    }
  }, [smsAvailable]);

  useEffect(() => {
    SMS.isAvailableAsync().then(setSmsAvailable);
  }, []);

  return (
    <View>
      <Button title={"Создание новой задачи"} onPress={loadPage} />
      <Button title={"Созданные посты"} onPress={loadPost} />
      <Button title={"Журнал пациентов"} onPress={loadPatientDate} />

      <Text>{email || "email"}</Text>
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
      <View>
        {smsAvailable ? (
          <Text>Press the button below to compose a SMS</Text>
        ) : (
          <Text>Unfortunately, SMS is not available on this device</Text>
        )}
      </View>
      <Button
        onPress={onComposeSms}
        disabled={!smsAvailable}
        mode="contained"
        icon="message"
        title={" Send sms"}
      />

    </View>
  );
}
