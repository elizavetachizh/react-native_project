import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { Formik } from "formik";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { BlockAddAppointment } from "../../styles/AddAppointments";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "native-base";
import React, { useContext, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../../components/CreadentialsContext";

export default function RestorePassword({ route, navigation }) {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [hidePassword, setHidePassword] = useState(true);
  console.log(route);

  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const handleMessage = (message, type = "FAILED") => {
    console.log("mess3", message);
    setMessage(message);
    setMessageType(type);
  };
  const handleRestorePassword = (credentials, setSubmitting) => {
    const url = "http://172.17.47.139:5500/user/passwordReset";
    axios
      .post(url, credentials)
      .then((res) => {
        const result = res.data;
        const { message, status, data } = result;
        if (status !== "SUCCESS") {
          console.log("ERROR", message, status);
          handleMessage(message, status);
        } else {
          navigation.navigate("Login");
          // persistForgotPassword({ ...data[0] }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage("Произошла ошибка, попробуйете отправить данные еще раз");
        console.log(error);
      });
  };

  const FormikForm = () => {
    return (
      <KeyboardAvoidingWrapper>
        <Formik
          initialValues={{
            email: route?.params?.email,
            newPassword: route?.params?.newPassword,
            resetString: route?.params?.resetString,
          }}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            if (
              values.email === undefined ||
              values.newPassword === "" ||
              values.resetString === ""
            ) {
              handleMessage("Заполнитре все поля");
              console.log("add vALUES");
              alert("Заполните все поля");
              setSubmitting(false);
              console.log(message);
            } else {
              handleRestorePassword(values, setSubmitting);
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
                text={"resetString"}
                label={"resetString"}
                placeholder={"resetString"}
                onChangeText={handleChange("resetString")}
                value={values.resetString}
                onBlur={handleBlur("resetString")}
              />

              <ComponentTextInput
                icon={"mail"}
                text={"password"}
                label={"password"}
                placeholder={"**********"}
                onChangeText={handleChange("newPassword")}
                value={values.newPassword}
                isPassword={true}
              />

              <Text type={messageType}>{message}</Text>
              {isSubmitting ? (
                <ActivityIndicator size={"large"} />
              ) : (
                <>
                  <Button onPress={handleSubmit} title="Продолжить" />
                </>
              )}
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
      </BlockAddAppointment>
    );
  };

  return (
    <>
      <Text>RestorePassword</Text>
      <View>
        <FormikForm />
      </View>
    </>
  );
}
