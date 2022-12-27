import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { BlockAddAppointment } from "../../styles/AddAppointments";
import { Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import axios from "axios";
// Google Signin
import * as Google from "expo-google-app-auth";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../../components/CreadentialsContext";

WebBrowser.maybeCompleteAuthSession();
export default function Login({ navigation, route }) {
  //возможность посотреть пароль
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  // const [accessToken, setAccessToken] = useState(null);
  // const [user, setUser] = useState(null);
  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  // const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
  //   clientId: `733939261043-lm0ml5sp92ve681rfn97m45adra3m6jg.apps.googleusercontent.com`,
  //   iosClientId: `733939261043-830l8hsp3r6an3vmmticv552l3s5dorn.apps.googleusercontent.com`,
  //   androidClientId: `733939261043-niifg43f9naounanc5vb8q0jjjbk2ckn.apps.googleusercontent.com`,
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     console.log(response)
  //     setAccessToken(response.authentication.accessToken);
  //     accessToken && fetchUserInfo();
  //   }
  // }, [response, accessToken]);

  // async function fetchUserInfo() {
  //   setGoogleSubmitting(true);
  //   let response = await fetch(
  //     "https://www.googleapis.com/auth/userinfo/v2/me",
  //     {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     }
  //   );
  //   const useInfo = await response.json();
  //   setUser(useInfo);
  // }

  // const ShowUserUnfo = () => {
  //   if (user) {
  //     return <Text>{user.name}</Text>;
  //   }
  // };

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://172.17.47.139:5500/user/login";
    axios
      .post(url, credentials)
      .then((res) => {
        const result = res.data;
        const { message, status, data } = result;
        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          persistLogin({ ...data[0] }, message, status);
          // navigation.navigate("Домашняя страница", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage("Произошла ошибка, попробуйете отправить данные еще раз");
      });
  };

  const handleMessage = (message, type = "FAILED") => {
    console.log("mess3", message);
    setMessage(message);
    setMessageType(type);
  };

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {
      clientId: `733939261043-lm0ml5sp92ve681rfn97m45adra3m6jg.apps.googleusercontent.com`,
      iosClientId: `733939261043-830l8hsp3r6an3vmmticv552l3s5dorn.apps.googleusercontent.com`,
      androidClientId: `733939261043-niifg43f9naounanc5vb8q0jjjbk2ckn.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type === "success") {
          const { email, name, photoUrl } = user;
          persistLogin(
            { email, name, photoUrl },
            "Google signin successful",
            "SUCCESS"
          );
        } else {
          handleMessage("Google Signin was cancelled");
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        handleMessage("An error occurred. Check your network and try again");
        console.log(error);
        setGoogleSubmitting(false);
      });
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("appUsers", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
        handleMessage("Parsisting login failed");
      });
  };

  const FormikForm = () => {
    return (
      <KeyboardAvoidingWrapper>
        <Formik
          initialValues={{ email: route?.params?.email, password: "" }}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            if (values.email === "" || values.password === "") {
              handleMessage("Заполнитре все поля");
              console.log("add vALUES");
              alert("Заполните все поля");
              setSubmitting(false);
              console.log(message);
            } else {
              handleLogin(values, setSubmitting);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <View>
              <ComponentTextInput
                icon={"mail"}
                text={"email"}
                label={"email"}
                placeholder={"email"}
                onChangeText={handleChange("email")}
                keyboardType="email-address"
                value={values.email}
                onBlur={handleBlur("email")}
              />

              <ComponentTextInput
                icon={"mail"}
                text={"password"}
                label={"password"}
                placeholder={"**********"}
                onChangeText={handleChange("password")}
                value={values.password}
                // onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <Text type={messageType}>{message}</Text>
              {isSubmitting ? (
                <ActivityIndicator size={"large"} />
              ) : (
                <>
                  <Button onPress={handleSubmit} title="Login" />
                </>
              )}
              <Button
                onPress={() => navigation.navigate("ForgotPassword")}
                title="Забыли пароль?"
              />

              {!googleSubmitting && (
                <Button
                  onPress={handleGoogleSignin}
                  google={true}
                  title="Sign in with Google"
                />
              )}

              {googleSubmitting && <ActivityIndicator size={"large"} />}
              {/*  {user && <ShowUserUnfo/>}*/}
              {/*  {user === null && <><TouchableOpacity disabled={!request} onP></TouchableOpacity></>}*/}
              <View>
                <Text>Еще не имеете аккаунта?</Text>
                <Button
                  title={"Sign up"}
                  onPress={() => navigation.navigate("SignUp")}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingWrapper>
    );
  };
  const ComponentTextInput = ({
    text,
    icon,
    isPassword,
    hidePassword,
    setHidePassword,
    ...props
  }) => {
    return (
      <BlockAddAppointment>
        <Text>{text}</Text>
        <Ionicons name={icon} size={30} />
        <Input {...props} />
        {isPassword && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} />
          </TouchableOpacity>
        )}
      </BlockAddAppointment>
    );
  };

  return (
    <View>
      <FormikForm />
    </View>
  );
}
