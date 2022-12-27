import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { ActivityIndicator, Button, Text } from "react-native";
import CodeInputField from "../components/CodeInputField";
import { useContext, useEffect, useState } from "react";
import axios from "../core/axios";
import ModalVerification from "../components/ModalVerification";
import { CredentialsContext } from "../components/CreadentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OTPVerification({ navigation, route }) {
  const [code, setCode] = useState("");
  const MAX_CODE_LENGTH = 4;
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  const [activeResend, setActiveResend] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [verificationSuccessful, setVirificationSuccessful] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const { userId, email } = route?.params;
  // const resendEmail = async () => {
  //   setResendingEmail(true);
  //
  //   try {
  //     setVerifying(true);
  //     const result = await axios.post(url, { userId, otp: code });
  //     const { data } = result;
  //     setResendStatus("Sent!");
  //     if (data.status !== "VERIFIED") {
  //       setRequestMessage("");
  //     }
  //   } catch (error) {
  //     setResendStatus("FAILED");
  //     alert(`Ошибка в повторной отправке подтвержения почты ${error.message}`);
  //   }
  //   setResendingEmail(false);
  // };
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const persistLoginAfterOTPVerification = async () => {
    try {
      const tempUser = await AsyncStorage.getItem("tempUser");
      await AsyncStorage.setItem("appUsers", JSON.stringify(tempUser));
      setStoredCredentials(JSON.parse(tempUser));
    } catch (error) {
      alert(`Ошибка в отпавке данных ${error.message}`);
    }
  };
  const submitOTPVerification = async () => {
    try {
      setVerifying(true);
      const url = "http://172.17.47.139:5500/user/userOTPPost";
      const result = await axios.post(url, { userId, otp: code });
      const { data } = result;
      console.log(`data`, data);
      if (data.status !== "VERIFIED") {
        setRequestMessage(data.message);
        setVirificationSuccessful(false);
      } else {
        setVirificationSuccessful(true);
      }
      setModalVisible(true);
      setVerifying(false);
    } catch (error) {
      setRequestMessage(error.message);
      setVirificationSuccessful(false);
      setModalVisible(true);
      setVerifying(false);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <>
        <Text>Account Verification</Text>
        <Text>Please enter the 4-digit code sent to</Text>
        <Text> {`${email}`}</Text>
        <CodeInputField
          setPinReady={setPinReady}
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
        />
        {!verifying && !pinReady && <Button title={"verify"} disabled={true} />}
        {!verifying && pinReady && (
          <Button title={"verify"} onPress={submitOTPVerification} />
        )}

        {verifying && (
          <>
            <Button
              disabled={true}
              title={"verify"}
              onPress={submitOTPVerification}
            />
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 15 }}>Загрузка...</Text>
          </>
        )}
        <ModalVerification
          successful={verificationSuccessful}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          requestMessage={requestMessage}
          persistLoginAfterOTPVerification={persistLoginAfterOTPVerification}
        />
      </>
    </KeyboardAvoidingWrapper>
  );
}
