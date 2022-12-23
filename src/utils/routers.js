import React from "react";
import Test from "../test";
import Home from "../page/home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FullPostScreen } from "../page/FullPost";
import PatientScreen from "../page/PatientScreen";
import DentalHome from "../page/DentalHome";
import AddPatients from "../page/AddPAtients";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import AddAppointmentScreen from "../page/AddAppointmentScreen";
import PatientsScreen from "../page/PatientsScreen";
import Posts from "../page/Posts";
import { Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PatientScreenUpdate from "../page/PatientScreenUpdate";
import Login from "../page/Login";
import SignUp from "../page/Registration";
import { CredentialsContext } from "../components/CreadentialsContext";
import LinkVerification from "../page/LinkVerification";
import OTPVerification from "../page/OTPVerification";
const Stack = createNativeStackNavigator();
export default function Routes({ navigation }) {
  const loadPage = () => {
    navigation.navigate("Patients");
  };
  return (
    <NativeBaseProvider>
      <CredentialsContext.Consumer>
        {({ storedCredentials }) => (
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"}>
              {storedCredentials ? (
                <>
                  <Stack.Screen
                    name={"Домашняя страница"}
                    component={Home}
                    options={{
                      title: "Домашняя страница",
                    }}
                  />
                  <Stack.Screen
                    name={"Posts"}
                    component={Posts}
                    options={{ title: "Созданные посты" }}
                  />
                  <Stack.Screen
                    name={"FullPost"}
                    component={FullPostScreen}
                    options={{ title: "Описание статьи" }}
                  />
                  <Stack.Screen
                    name={"Test"}
                    component={Test}
                    options={{ title: "Создание задачи" }}
                  />
                  <Stack.Screen
                    name={"Patient"}
                    component={PatientScreen}
                    options={{ title: "Карта пациента" }}
                  />
                  <Stack.Screen
                    name={"Patient date"}
                    component={DentalHome}
                    options={({ navigation }) => ({
                      title: "Журнал пациентов",
                      headerRight: () => (
                        <TouchableOpacity
                          onPress={navigation.navigate.bind(this, "Patients")}
                          style={{ marginRight: 20 }}
                        >
                          <Ionicons name="md-people" size={28} color="black" />
                        </TouchableOpacity>
                      ),
                    })}
                  />
                  <Stack.Screen
                    name={"AddPatient"}
                    component={AddPatients}
                    options={{ title: "Добавление пациента" }}
                  />
                  <Stack.Screen
                    name={"AddAppointment"}
                    component={AddAppointmentScreen}
                    options={{ title: "Добавление приёма для пациента" }}
                  />
                  <Stack.Screen
                    name={"Patients"}
                    component={PatientsScreen}
                    options={{ title: "Пациенты" }}
                  />
                  <Stack.Screen
                    name={"UpdatePatient"}
                    component={PatientScreenUpdate}
                    options={{ title: "Редактирование данных клиента" }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name={"Login"}
                    component={Login}
                    options={{ title: "Login" }}
                  />
                  <Stack.Screen
                    name={"SignUp"}
                    component={SignUp}
                    options={{ title: "SignUp" }}
                  />
                  <Stack.Screen
                    name={"LinkVerification"}
                    component={LinkVerification}
                    options={{ title: "LinkVerification" }}
                  />
                  {/*<Stack.Screen*/}
                  {/*  name={"OTPVerification"}*/}
                  {/*  component={OTPVerification}*/}
                  {/*  options={{ title: "OTPVerification" }}*/}
                  {/*/>*/}
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </CredentialsContext.Consumer>
    </NativeBaseProvider>
  );
}
