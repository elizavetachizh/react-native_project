import { Text } from "react-native";
import { useEffect, useState } from "react";
import { patientsApi } from "../utils/api";
import { Container } from "../styles/Container";
import { Input } from "native-base";
import { ButtonView } from "../styles/Button";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { BlockAddAppointment } from "../styles/AddAppointments";

export default function PatientScreenUpdate({ route, navigation }) {

  const [values, setValues] = useState({
    fullName: route.params.data[1],
    phone: route.params.data[2],
    email: route.params.data[3],
  });
  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
    // console.log("values", values);
  };
  const handleInputChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };

  const fieldsName = {
    fullName: "Имя",
    phone: "Телефон",
    email: "email",
  };

  const onSubmit = () => {
    console.log("rgrg",values);
    console.log(route.params.data[0])
    patientsApi
      .update(route.params.data[0], values)
      .then(() => {
        navigation.navigate("Patients");
        alert("Пациент отредактирован");
      })
      .catch((e) => {
        console.log(e)
        // if (e.response.data && e.response.data.message) {
        //   e.response.data.message.forEach((err) => {
        //     const fieldName = err.param;
        //     const messageError = err.msg;
        //     alert(`Ошибка! В поле "${fieldsName[fieldName]}" ${messageError}.`);
        //   });
        // }
        // if (e.response.data && e.response.data.message) {
        //   e.response.data.message.forEach((err) => {
        //     const fieldName = err.param;
        //     const messageError = err.msg;
        //     alert(`Ошибка! В поле "${fieldsName[fieldName]}" ${messageError}.`);
        //   });
        // }
        // console.log(e.response.data.message[0].msg);
      });
  };
  return (
    <Container>
      <BlockAddAppointment>
        <Text>Имя и Фамилия</Text>
        <Input
          onChange={handleInputChange.bind(this, "fullName")}
          value={values.fullName}
          style={{ marginTop: 12 }}
          autoFocus
          placeholder="ФИО полностью"
        />
      </BlockAddAppointment>

      <BlockAddAppointment>
        <Text>Номер телефона</Text>
        <Input
          onChange={handleInputChange.bind(this, "phone")}
          value={values.phone}
          keyboardType="phone-pad"
          pla
          dataDetectorTypes="phoneNumber"
          placeholder="+375ХХХХХХХХХ"
          style={{ marginTop: 12 }}
        />
      </BlockAddAppointment>

      <BlockAddAppointment>
        <Text>Email</Text>
        <Input
          onChange={handleInputChange.bind(this, "email")}
          value={values.email}
          keyboardType="address"
          dataDetectorTypes="email-address"
          placeholder="Введите e-mail"
          style={{ marginTop: 12 }}
        />
      </BlockAddAppointment>

      <ButtonView>
        <Button onPress={onSubmit} color="#87CC6F">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Отредактировать пациента</Text>
        </Button>
      </ButtonView>
    </Container>
  );
}
