import React from "react";
import {Image, Text, View} from "react-native";
import styled from "styled-components/native";
import { GrayText } from "../styles/PatientScreen";
import {FullName, GroupItem} from "../styles/Appointment";
import Badge from "../styles/Badge";

const Appointment = ({ navigate, item, user }) => {
  const { about, active, time } = item;
  return (
    <GroupItem onPress={navigate.bind(this, "Patient", item)}>
      <View style={{ flex: 1 }}>
        <FullName>{user.fullName}</FullName>
          <Image source={{uri: user.picture}} style={{width:100, height:100}} />
        <GrayText>{about}</GrayText>
      </View>
      {time && <Badge active={active}>{time}</Badge>}
    </GroupItem>
  );
};

Appointment.defaultProps = {
  groupTitle: "Untitled",
  items: [],
};

const Letter = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: -1px;
`;



const Avatar = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;


export default Appointment;
