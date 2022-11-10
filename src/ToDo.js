import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function ToDo({ todo, onRemove }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onLongPress={() => onRemove(todo.id)}>
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: "#eee",
    marginBottom: 10,
  },
});
