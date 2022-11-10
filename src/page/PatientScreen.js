import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Linking } from "react-native";
import styled from "styled-components/native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  AppointmentCard,
  AppointmentCardLabel,
  AppointmentCardRow,
  FormulaButtonView,
  GrayText,
  MoreButton,
  PatientAppointments,
  PatientButtons,
  PatientDetails,
  PatientFullname,
  PhoneButtonView,
} from "../styles/PatientScreen";
import Button from "../components/Button";

// import {
//   GrayText,
//   Button,
//   Badge,
//   Container,
//   Appointment,
//   PlusButton
// } from '../components';
//
// import { patientsApi, phoneFormat } from '../utils';

const PatientScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const id = navigation.getParam('patient')._id;
  //   patientsApi
  //     .show(id)
  //     .then(({ data }) => {
  //       setAppointments(data.data.appointments);
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <PatientDetails>
        <PatientFullname>gfgfg</PatientFullname>
        <GrayText>sfsf</GrayText>
        <PatientButtons>
          <FormulaButtonView>
            <Button>Формула зубов</Button>
          </FormulaButtonView>
          <PhoneButtonView>
            <Button onPress={() => console.log("dfdf")} color="#84D269">
              <Foundation name="telephone" size={22} color="white" />
            </Button>
          </PhoneButtonView>
        </PatientButtons>
      </PatientDetails>

      <PatientAppointments>
        <View>
          <AppointmentCard>
            <MoreButton>
              <Ionicons name="md-more" size={24} color="rgba(0, 0, 0, 0.4)" />
            </MoreButton>
            <AppointmentCardRow>
              <Ionicons name="md-medical" size={16} color="#A3A3A3" />
              <AppointmentCardLabel>
                Зуб: <Text style={{ fontWeight: "600" }}>dfdf</Text>
              </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow>
              <Foundation name="clipboard-notes" size={16} color="#A3A3A3" />
              <AppointmentCardLabel>
                Диагноз: <Text style={{ fontWeight: "600" }}>dfdf</Text>
              </AppointmentCardLabel>
            </AppointmentCardRow>
            <AppointmentCardRow
              style={{ marginTop: 15, justifyContent: "space-between" }}
            ></AppointmentCardRow>
          </AppointmentCard>
        </View>
      </PatientAppointments>
    </View>
  );
};

// PatientScreen.navigationOptions = {
//   title: "Карта пациента",
//   headerTintColor: "#2A86FF",
//   headerStyle: {
//     elevation: 0.8,
//     shadowOpacity: 0.8,
//   },
// };

export default PatientScreen;
