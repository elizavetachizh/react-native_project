import { Button, Text } from "react-native";
import { useState } from "react";
import axios from "../core/axios";

export default function LinkVerification({ navigation, route }) {
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  const [activeResend, setActiveResend] = useState(false);
  const { userId, email } = route?.params;
  const resendEmail = async () => {
    setResendingEmail(true);
    const url = "http://localhost:5500/user/resendVerificationLink";
    try {
      await axios.post(url, { email, userId });
      setResendStatus("Sent!");
    } catch (error) {
      setResendStatus("FAILED");
      alert(`Ошибка в повторной отправке подтвержения почты ${error.message}`);
    }
    setResendingEmail(false);
  };
  return (
    <>
      <Text>Перейдите на почту для подтверждения</Text>
      <Text>{`${email}`}</Text>
      <Button
        title={"Click"}
        onPress={() => navigation.navigate("Login", { email: email })}
      />
    </>
  );
}
