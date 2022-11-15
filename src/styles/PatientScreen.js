import styled from "styled-components/native";
import Container from "@react-navigation/native-stack/src/views/DebugContainer";

export const MoreButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 32px;
  width: 32px;
`;

export const AppointmentCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

export const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
`;

export const AppointmentCard = styled.View`
  box-shadow: 1px 1px rgba(0,0,0, 0.2);
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
  margin-bottom: 20px;
`;

export const PatientDetails = styled(Container)`
  flex: 0.2;
`;

export const PatientAppointments = styled.View`
  flex: 1.4;
  background: #f8fafd;
`;

export const FormulaButtonView = styled.View`
  flex: 1;
`;

export const PhoneButtonView = styled.View`
  margin-left: 10px;
  width: 45px;
`;

export const PatientButtons = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
`;

export const PatientFullname = styled.Text`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

export const GrayText = styled.Text`
  font-size: 16px;
  color: #8b979f;
`;
