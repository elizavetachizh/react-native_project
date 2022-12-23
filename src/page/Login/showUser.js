import { usersApi } from "../../utils/api";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

const UserScreen = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("data", data);

  const fetchUser = () => {
    setIsLoading(true);
    usersApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally((e) => {
        setIsLoading(false);
      });
  };

  useEffect(fetchUser, []);

  return (
    <View>
      <>
        {data &&
          data.map((el) => (
            <>
              <Text>{el.email}</Text>
              <Text>{el.name}</Text>
              <Text>{el.phone}</Text>
            </>
          ))}
      </>
    </View>
  );
};

export default UserScreen;
