import { ActivityIndicator, Button, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { BlockAddAppointment } from "../../styles/AddAppointments";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "native-base";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { Formik } from "formik";
import axios from "axios";

export default function ForgotPassword({ route, navigation }) {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const handleMessage = (message, type = "FAILED") => {
    console.log("mess3", message);
    setMessage(message);
    setMessageType(type);
  };
  const handleForgotPassword = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://172.17.47.139:5500/user/requestPasswordReset";
    axios
      .post(url, credentials)
      .then((res) => {
        const result = res.data;
        const { message, status, data } = result;
        console.log(result);
        if (status !== "PENDING") {
          handleMessage(message, status);
        } else {
          navigation.navigate("RestorePassword");
          // persistForgotPassword({ ...data[0] }, message, status);
          // navigation.navigate("Домашняя страница", { ...data[0] });
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
            redirectUrl: "google.com",
          }}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            console.log(`values`, values);
            if (values.email === undefined) {
              handleMessage("Заполнитре все поля");
              alert("Заполните все поля");
              setSubmitting(false);
              console.log(message);
            } else {
              setSubmitting(true);
              handleForgotPassword(values, setSubmitting);
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
    <View>
      <Text>Забыли пароль?</Text>
      <FormikForm />
    </View>
  );
}
