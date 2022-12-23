import {
  CodeInput,
  CodeInputContainer,
  CodeInputFocus,
  CodeInputsection,
  CodeInputText,
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
  const codeDigitsArray = new Array(maxLength).fill(0);
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
    return () => setPinReady(false);
  }, [code]);

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyledCodeInput =
      inputContainerIsFocused && isDigitFocused ? CodeInputFocus : CodeInput;
    return (
      <StyledCodeInput key={index}>
        <CodeInputText>{digit}</CodeInputText>
      </StyledCodeInput>
    );
  };
  return (
    <CodeInputsection>
      <CodeInputContainer onPress={handleOnPress} />
      {codeDigitsArray.map(toCodeDigitInput)}
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
