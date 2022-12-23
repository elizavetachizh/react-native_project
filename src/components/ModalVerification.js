import { Modal } from "native-base";
import { ModalContainer, ModalView } from "../styles/Verification";
import { Button, Text } from "react-native";

export default function ModalVerification({
  successful,
  setModalVisible,
  modalVisible,
  requestMessage,
  persistLoginAfterOTPVerification,
}) {
  const SuccessContent = ({ buttonHandler }) => {
    return (
      <ModalView>
        <Text>true</Text>
        <Button title={"Next"} onPress={buttonHandler} />
      </ModalView>
    );
  };
  const FailContent = ({ errorMsg, buttonHandler }) => {
    return (
      <ModalView>
        <Text>`${errorMsg}`</Text>
        <Button title={"Next"} onPress={buttonHandler} />
      </ModalView>
    );
  };

  const buttonHandler = ({}) => {
    if (successful) {
      persistLoginAfterOTPVerification();
    }
    setModalVisible(false);
  };
  return (
    <>
      <Modal animationType={"slide"} visible={modalVisible} transparent={true}>
        <ModalContainer>
          {!successful && (
            <FailContent
              buttonHandler={buttonHandler}
              errorMsg={requestMessage}
            />
          )}
          {successful && <SuccessContent buttonHandler={buttonHandler} />}
        </ModalContainer>
      </Modal>
    </>
  );
}
