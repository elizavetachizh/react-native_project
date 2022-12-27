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
        <Text>Аутинтифакция прошла удачно</Text>
        <Button title={"Войти в приложение"} onPress={buttonHandler} />
      </ModalView>
    );
  };
  const FailContent = ({ errorMsg, buttonHandler }) => {
    return (
      <ModalView>
        <Text>{errorMsg}</Text>
        <Button title={"Попробуйте еще раз"} onPress={buttonHandler} />
      </ModalView>
    );
  };

  const buttonHandler = ({}) => {
    if (successful) {
      console.log(successful);
      persistLoginAfterOTPVerification();
    }
    setModalVisible(false);
  };
  return (
    <>
      <Modal animationType={"slide"} isOpen={modalVisible} transparent={true}>
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
