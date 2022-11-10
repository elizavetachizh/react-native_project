import React from "react";
import Test from "../test";
import Home from "../page/home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FullPostScreen } from "../page/FullPost";
import PatientScreen from "../page/PatientScreen";
import DentalHome from "../page/DentalHome";
const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"Домашняя страница"}
          component={Home}
          options={{ title: "Домашняя страница" }}
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
            options={{ title: "Данные поциентов" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
