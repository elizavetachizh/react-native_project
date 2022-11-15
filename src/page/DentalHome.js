import React, { useState, useEffect } from "react";
import {
  SectionList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Appointment from "../components/Appointment";
import { SectionTitle, SwipeViewButton } from "../styles/Appointment";
import { appointmentsApi } from "../utils/api";
import PlusButton from "../components/PlusButton";
import { Container } from "../styles/Container";
import Swipeable from "react-native-gesture-handler/Swipeable";

const HomeScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = () => {
    setIsLoading(true);
    appointmentsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(fetchAppointments, []);
  // TODO: Продумать удаление приемов

  const removeAppointment = (id) => {
    Alert.alert(
      "Удаление приема",
      "Вы действительно хотите удалить прием?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            setIsLoading(true);
            appointmentsApi
              .remove(id)
              .then(() => {
                fetchAppointments();
              })
              .catch(() => {
                setIsLoading(false);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchAppointments}
            />
          }
          refreshing={isLoading}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => {
                return (
                  <>
                    <SwipeViewButton style={{ backgroundColor: "#B4C1CB" }}>
                      <Ionicons name="md-create" size={28} color="white" />
                    </SwipeViewButton>
                    <SwipeViewButton
                      onPress={removeAppointment.bind(this, item._id)}
                      style={{ backgroundColor: "#F85A5A" }}
                    >
                      <Ionicons name="ios-close" size={48} color="white" />
                    </SwipeViewButton>
                  </>
                );
              }}
            >
              <Appointment
                navigate={navigation.navigate}
                item={item}
                user={item.user}
              />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      )}
      <PlusButton onPress={navigation.navigate.bind(this, "AddPatient")} />
    </Container>
  );
};

export default HomeScreen;
