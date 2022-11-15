import { useEffect, useState } from "react";
import { Container } from "../styles/Container";
import { ButtonView } from "../styles/Button";
import { patientsApi } from "../utils/api";
import Button from "../components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { Input } from "native-base";
import { BlockAddAppointment } from "../styles/AddAppointments";

//компонент создания нового клиента с полями
export default function AddPatients({ route, navigation }) {
  const [values, setValues] = useState({});

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const fieldsName = {
    fullName: "Имя",
    phone: "Телефон",
    email: "email",
  };

  const onSubmit = () => {
    patientsApi
      .add(values)
      .then(() => {
        navigation.navigate("Patients");
        alert("Пациент добавлен");
      })
      .catch((e) => {
        if (e.response.data && e.response.data.message) {
          e.response.data.message.forEach((err) => {
            const fieldName = err.param;
            const messageError = err.msg;
            alert(`Ошибка! В поле "${fieldsName[fieldName]}" ${messageError}.`);
          });
        }
        console.log(e.response.data.message[0].msg);
      });
  };
  return (
    <Container>
      <BlockAddAppointment>
        <Text>Имя и Фамилия</Text>
        <Input
          onChange={handleChange.bind(this, "fullName")}
          value={values.fullName}
          style={{ marginTop: 12 }}
          autoFocus
          placeholder="ФИО полностью"
        />
      </BlockAddAppointment>

      <BlockAddAppointment>
        <Text>Номер телефона</Text>
        <Input
          onChange={handleChange.bind(this, "phone")}
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
          onChange={handleChange.bind(this, "email")}
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
          <Text>Добавить пациента</Text>
        </Button>
      </ButtonView>
    </Container>
  );
}
