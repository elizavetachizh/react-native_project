import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { BlockAddAppointment } from "../../styles/AddAppointments";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { Formik } from "formik";
import Login from "../Login";
import { CredentialsContext } from "../../components/CreadentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp({ navigation, route }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleSignUp = async (credentials, setSubmitting) => {
    const url = "http://172.17.47.139:5500/user/registration";
    axios
      .post(url, credentials)
      .then((res) => {
        const result = res.data;
        const { message, status, data } = result;
        if (status !== "PENDING") {
          handleMessage(message, status);
        } else {
          temporaryUserPersist(({ email, name } = credentials));

          navigation.navigate("OTPVerification", { ...data });

        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage("Произошла ошибка, попробуйете отправить данные еще раз");
      });
  };

  const temporaryUserPersist = async (credentials) => {
    try {
      await AsyncStorage.setItem("tempUser", JSON.stringify(credentials));
    } catch (error) {
      handleMessage("Ошибка с обработкой данных");
    }
  };

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  // Persisting login after signup
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("appUsers", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage("Persisting login failed");
        console.log(error);
      });
  };
  useEffect(() => {
    console.log(storedCredentials);
  }, [storedCredentials]);
  const FormikForm = () => {
    return (
      <KeyboardAvoidingWrapper>
        <Formik
          initialValues={{
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (
              values.email === "" ||
              values.phone === "" ||
              values.password === "" ||
              values.confirmPassword === ""
            ) {
              handleMessage("Заполните все поля");
              alert("Заполните все поля");
              setSubmitting(false);
              // console.log(`mess4`, message);
            } else if (values.password !== values.confirmPassword) {
              handleMessage("Пароли не совпадают");
              setSubmitting(false);
            } else {
              handleSignUp(values, setSubmitting);
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
                keyboardType="email-address"
                placeholder={"email"}
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
              />

              <ComponentTextInput
                icon={"mail"}
                text={"phone"}
                label={"phone"}
                placeholder={"phone"}
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                value={values.phone}
                onBlur={handleBlur("phone")}
              />

              <ComponentTextInput
                icon={"mail"}
                text={"password"}
                label={"password"}
                placeholder={"**********"}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <ComponentTextInput
                icon={"mail"}
                text={"confirmPassword"}
                label={"confirmPassword"}
                placeholder={"**********"}
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />

              <Text type={messageType}>{message}</Text>
              {isSubmitting ? (
                <ActivityIndicator size={"large"} />
              ) : (
                <Button onPress={handleSubmit} title="SignUp" />
              )}

              <View>
                <Text>Уже есть аккаунт?</Text>
                <Button
                  title={"Login"}
                  onPress={() => navigation.navigate("Login")}
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
      <Text>SignUp</Text>
      <FormikForm />
    </View>
  );
}
