import { Button, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";
export default function AddToDo({ onSubmit }) {
  const [value, setValue] = useState("");
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    } else {
      Alert.alert("Введите название");
    }
  };
  return (
    <View>
      <TextInput
        onChangeText={(text) => setValue(text)}
        placeholder={"Введите название задания"}
        value={value}
      />
      <Button onPress={pressHandler} title={"Добавить"} />
    </View>
  );
}
