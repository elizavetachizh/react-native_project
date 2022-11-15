import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Linking,
  SectionList,
  RefreshControl,
  FlatList,
} from "react-native";
import { Foundation, Ionicons, Entypo } from "@expo/vector-icons";
import Badge from "../styles/Badge";
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
import { patientsApi } from "../utils/api";
import { Container } from "../styles/Container";
import PlusButton from "../components/PlusButton";

const PatientScreen = ({ navigation, route }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fullName = route.params.patient.fullName;
  const phone = route.params.patient.phone;
  const email = route.params.patient.email;
  console.log(route.params.patient)
  const fetchPatientsInfo = () => {
    setIsLoading(true);
    navigation.setOptions({
      fullName: fullName === "" ? "no" : fullName,
      phone: phone === "" ? "no" : phone,
      email: email === "" ? "no" : email,
    });
    const id = route.params.patient._id;

    patientsApi
      .show(id)
      .then(({ data }) => {
        setAppointments(data.data.appointments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(
    fetchPatientsInfo,

    [fullName, navigation]
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <PatientDetails>
        <PatientFullname>{fullName}</PatientFullname>
        <GrayText>{phone}</GrayText>
        <GrayText>{email}</GrayText>
        <PatientButtons>
          <FormulaButtonView>
            <Button>Формула зубов</Button>
          </FormulaButtonView>
          <PhoneButtonView>
            <Button
              onPress={() => Linking.openURL("tel:" + phone)}
              color="#84D269"
            >
              <Foundation name="telephone" size={22} color="white" />
            </Button>
          </PhoneButtonView>
        </PatientButtons>
      </PatientDetails>

      <PatientAppointments>
        <Container>
          {isLoading ? (
            <ActivityIndicator size="large" color="#2A86FF" />
          ) : (
            <>
              {appointments && (
                <FlatList
                  data={appointments}
                  keyExtractor={(item) => item._id}
                  refreshControl={
                    <RefreshControl
                      refreshing={isLoading}
                      onRefresh={fetchPatientsInfo}
                    />
                  }
                  refreshing={isLoading}
                  renderItem={({ item }) => (
                    <AppointmentCard>
                      <MoreButton>
                        <Entypo
                          name="dots-two-horizontal"
                          size={24}
                          color="rgba(0, 0, 0, 0.4)"
                        />
                      </MoreButton>
                      <AppointmentCardRow>
                        <Ionicons name="md-medical" size={16} color="#A3A3A3" />
                        <AppointmentCardLabel>
                          Зуб:{" "}
                          <Text style={{ fontWeight: "600" }}>
                            {item.toothNumber}
                          </Text>
                        </AppointmentCardLabel>
                      </AppointmentCardRow>
                      <AppointmentCardRow>
                        <Foundation
                          name="clipboard-notes"
                          size={16}
                          color="#A3A3A3"
                        />
                        <AppointmentCardLabel>
                          Диагноз:{" "}
                          <Text style={{ fontWeight: "600" }}>
                            {item.diagnosis}
                          </Text>
                        </AppointmentCardLabel>
                      </AppointmentCardRow>
                      <AppointmentCardRow
                        style={{
                          marginTop: 15,
                          justifyContent: "space-between",
                        }}
                      >
                        <Badge style={{ width: 155 }} active>
                          {item.date} - {item.time}
                        </Badge>
                        <Badge color="green">{item.price} Р</Badge>
                      </AppointmentCardRow>
                    </AppointmentCard>
                  )}
                />
              )}
            </>
          )}
        </Container>
      </PatientAppointments>
      <PlusButton
        onPress={navigation.navigate.bind(this, "AddAppointment", {
          patientId: route.params.patient._id,
        })}
      />
    </View>
  );
};

PatientScreen.navigationOptions = {
  title: "Карта пациента",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default PatientScreen;
