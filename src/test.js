import { FlatList, StyleSheet, View } from "react-native";
import Navbar from "./Navbar";
import AddToDo from "./addToDo";
import ToDo from "./ToDo";
import { Text } from "./styles";
import { useState } from "react";

export default function Test() {
  const [todos, setTodos] = useState([]);
  const addTodo = (title) => {
    setTodos((prevTodo) => [...prevTodo, { id: Date.now().toString(), title }]);
  };

  const removeToDo = (id) => {
    setTodos((prevToDo) => prevToDo.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Navbar title={"Navbar"} />
      <View style={styles.view}>
        <AddToDo onSubmit={addTodo} />

        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={todos}
          renderItem={({ item }) => <ToDo todo={item} onRemove={removeToDo} />}
        />
      </View>
      <Text>start</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    marginTop: "10%",
  },
});
