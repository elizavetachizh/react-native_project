import React, { useState, useEffect } from "react";
import { FlatList, Alert, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { patientsApi } from "../utils/api";
import { Input } from "native-base";
import Appointment from "../components/Appointment";
import { SectionTitle } from "../styles/Appointment";
import PlusButton from "../components/PlusButton";
import Swipeable from "react-native-gesture-handler/Swipeable";

const PatientsScreen = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const fullName = data[0].fullName;
  // const phone = data[0].phone;
  // const email = data[0].email;
  // console.log(data.fullName);
  console.log("data", data && Object.values(data[0]));

  const fetchPatients = () => {
    setIsLoading(true);
    patientsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally((e) => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPatients, []);

  // useEffect(fetchPatients, [navigation.state.params]);
  // console.log(navigation.state.params);
  const onSearch = (e) => {
    setSearchValue(e.nativeEvent.text);
  };

  const removePatient = (id) => {
    Alert.alert(
      "Удаление пациента",
      "Вы действительно хотите удалить пациента?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Пациент удален"),
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            setIsLoading(true);
            patientsApi
              .remove(id)
              .then(() => {
                fetchPatients();
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

  const updatePatient = () => {
    Alert.alert(
      "приема",
      "Вы действительно хотите отредактировать пациента?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Редактировать",
          onPress: () => {
            setIsLoading(true);
            navigation.navigate("UpdatePatient", {
              data: data && (Object.values(data[0])),
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
        <>
          <View style={{ padding: 20 }}>
            <Input onChange={onSearch} placeholder="Поиск..." />
          </View>
          <FlatList
            data={data.filter(
              (item) =>
                item.fullName
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )}
            keyExtractor={(item) => item._id}
            onRefresh={fetchPatients}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() => {
                  return (
                    <>
                      <SwipeViewButton
                        onPress={updatePatient}
                        style={{ backgroundColor: "#B4C1CB" }}
                      >
                        <Ionicons name="md-create" size={28} color="white" />
                      </SwipeViewButton>
                      <SwipeViewButton
                        onPress={removePatient.bind(this, item._id)}
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
                  item={{
                    patient: item,
                    diagnosis: item.phone,
                  }}
                />
              </Swipeable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>{title}</SectionTitle>
            )}
          />
        </>
      )}
      <PlusButton onPress={navigation.navigate.bind(this, "AddPatient")} />
    </Container>
  );
};

PatientsScreen.navigationOptions = {
  title: "Пациенты",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

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

export default PatientsScreen;
