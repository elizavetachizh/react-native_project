import React from "react";
import { View } from "react-native";
import { GrayText } from "../styles/PatientScreen";
import { Avatar, FullName, GroupItem, Letter } from "../styles/Appointment";
import Badge from "../styles/Badge";
import getAvatarColor from "../utils/getAvatarColor";

const Appointment = ({ navigate, item }) => {
  //передача необходимых данных и базы
  const { patient, diagnosis, active, time } = item;
  //подключение функции изменения иконки
  const avatarColors = getAvatarColor(patient.fullName[0].toUpperCase());
  return (
    <GroupItem onPress={navigate.bind(this, "Patient", item)}>
      <Avatar
        style={{
          backgroundColor: avatarColors.background,
        }}
      >
        <Letter style={{ color: avatarColors.color }}>
          {patient.fullName[0].toUpperCase()}
        </Letter>
      </Avatar>
      <View style={{ flex: 1 }}>
        <FullName>{patient.fullName}</FullName>
        <GrayText>{diagnosis}</GrayText>
        <GrayText>{patient.email}</GrayText>
      </View>
      {time && <Badge active={active}>{time}</Badge>}
    </GroupItem>
  );
};

Appointment.defaultProps = {
  groupTitle: "Untitled",
  items: [],
};

export default Appointment;
