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
  // console.log(`codeDigitsArray`, codeDigitsArray);

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

  // const toCodeDigitInput = (_value, index) => {
  //   const emptyInputChar = " ";
  //   const digit = code[index];
  //   const isCurrentDigit = index === code.length;
  //   const isLastDigit = index === maxLength - 1;
  //   const isCodeFull = code.length === maxLength;
  //   console.log(`code[index]`, code[index]);
  //   const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
  //   console.log(`isDigitFocused`, isDigitFocused);
  //   console.log(`isCurrentDigit`, isCurrentDigit);
  //   console.log(`isLastDigit`, isLastDigit);
  //   console.log("isCodeFull", isCodeFull);
  //   console.log("digit", digit);
  //   console.log("index", index);
  //   const StyledCodeInput =
  //     inputContainerIsFocused && isDigitFocused ? CodeInputFocus : CodeInput;
  //   return (
  //     <StyledCodeInput key={index}>
  //       <CodeInputText>{code}</CodeInputText>
  //     </StyledCodeInput>
  //   );
  // };
  return (
    <CodeInputsection>
      <CodeInputContainer onPress={handleOnPress} />
      {/*{codeDigitsArray.map(toCodeDigitInput)}*/}
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
