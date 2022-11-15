import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { appointmentsApi } from "../utils/api";
import { Container } from "../styles/Container";
import { ButtonView } from "../styles/Button";
import Button from "../components/Button";
import { BlockAddAppointment, TimeRow } from "../styles/AddAppointments";
import DatePicker from "react-native-datepicker";
import { Input } from "native-base";

const AddAppointmentScreen = ({ navigation, route }) => {
  const [values, setValues] = useState({
    diagnosis: "пульпит",
    toothNumber: "",
    price: "",
    date: "",
    time: "",
    patient: route.params.patientId,
    // patient: {
    //   patientId: route.params.patient.patientId,
    //   email: route.params.patient.email,
    //   fullName: route.params.patient.fullName,
    //   phone: route.params.patient.phone,
    // },
  });

  const fieldsName = {
    diagnosis: "Диагноз",
    toothNumber: "Номер зуба",
    price: "Цена",
    date: "Дата",
    time: "Время",
    patient: "patient",
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
    console.log("values", values);
  };

  const handleInputChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };

  const onSubmit = () => {
    appointmentsApi
      .add(values)
      .then(() => {
        alert("Приём был добавлен");
        navigation.navigate("Patient date");
      })
      .catch((err) => {
        console.log(err);
        // if (e.response.data && e.response.data.message) {
        //   e.response.data.message.forEach((err) => {
        //     const fieldName = err.param;
        //     alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
        //   });
        // }
      });
  };
  return (
    <Container>
      <BlockAddAppointment>
        <Text>Номер зуба</Text>
        <Input
          onChange={handleInputChange.bind(this, "toothNumber")}
          value={values.toothNumber}
          style={{ marginTop: 12 }}
          keyboardType="numeric"
        />
      </BlockAddAppointment>

      <BlockAddAppointment>
        <Text>Цена</Text>
        <Input
          onChange={handleInputChange.bind(this, "price")}
          value={values.price}
          keyboardType="numeric"
          style={{ marginTop: 12 }}
        />
      </BlockAddAppointment>
      <Text>Диагноз</Text>

      {/*<Picker*/}
      {/*  mode="dropdown"*/}
      {/*  placeholderStyle={{ color: "#bfc6ea" }}*/}
      {/*  placeholderIconColor="#007aff"*/}
      {/*  style={{ width: "100%" }}*/}
      {/*  onValueChange={setFieldValue.bind(this, "diagnosis")}*/}
      {/*  selectedValue={values.diagnosis}*/}
      {/*/>*/}

      {/*<Picker.Item label="пульпит" value="пульпит"/>*/}

      {/*<Picker.Item label="удаление зуба" value="удаление зуба"/>*/}

      {/*</Picker>*/}

      <TimeRow>
        <View style={{ flex: 1 }}>
          <DatePicker
            style={{ width: "100%" }}
            mode="date"
            placeholder="Выберете дату"
            format="YYYY-MM-DD"
            minDate={new Date()}
            confirmBtnText="Сохранить"
            cancelBtnText="Отмена"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            date={values.date}
            onDateChange={setFieldValue.bind(this, "date")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DatePicker
            style={{ width: "100%" }}
            mode="time"
            placeholder="Выберете время"
            format="HH:MM"
            minDate={new Date()}
            confirmBtnText="Сохранить"
            cancelBtnText="Отмена"
            customStyles={{
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            date={values.time}
            onDateChange={setFieldValue.bind(this, "time")}
          />
        </View>
      </TimeRow>
      <ButtonView>
        <Button onPress={onSubmit} color="#87CC6F">
          <Ionicons name="ios-add" size={24} color="white" />
          <Text>Добавить прием</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};

export default AddAppointmentScreen;
