import React, { useState, useEffect } from "react";
import { SectionList, Alert, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import axios from "axios";
import { Swipeable } from "react-native-gesture-handler";
import Appointment from "../components/Appointment";
import {SectionTitle} from "../styles/Appointment";

const HomeScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios.get("https://trycode.pw/c/F0LMH.json").then(({ data }) => {
      setData(data);
    });
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  // TODO: Продумать удаление приемов

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
              <Appointment
                navigate={navigation.navigate}
                item={item}
                user={item.user}
              />
          )}
          renderSectionHeader={({ section: { title } }) => <SectionTitle>{title} ноября</SectionTitle>}
        />
      )}
    </Container>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: "Журнал приёмов",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
  headerRight: () => (
    <TouchableOpacity
      onPress={navigation.navigate.bind(this, "Patients")}
      style={{ marginRight: 20 }}
    >
      <Ionicons name="md-people" size={28} color="black" />
    </TouchableOpacity>
  ),
});

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;
