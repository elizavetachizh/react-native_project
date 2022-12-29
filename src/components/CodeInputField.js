import {
  CodeInputContainer,
  CodeInputsection,
  HiddenText,
} from "../styles/Verification";
import { useEffect, useRef, useState } from "react";

export default function CodeInputField({
  setPinReady,
  code,
  setCode,
  maxLength,
}) {
  const textInputRef = useRef(null);

  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };
  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    setPinReady(code.length === maxLength);
    console.log(`code`, code.length);
    return () => setPinReady(false);
  }, [code, maxLength, setCode, setPinReady]);

  return (
    <CodeInputsection>
      <CodeInputContainer onPress={handleOnPress} />
      <HiddenText
        ref={textInputRef}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType={"number-pad"}
        returnKeyType={"done"}
        textContentType={"oneTimeCode"}
        maxLength={maxLength}
      />
    </CodeInputsection>
  );
}
