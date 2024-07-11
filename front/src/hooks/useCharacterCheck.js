// useCharacterCheck.js
import { useCallback } from "react";

const useCharacterCheck = () => {
  const checkSpecialCharacters = useCallback((e) => {
    const regExp = /[\{\}\[\]\/;:|\)*`\-_+┼<>\#$%\'\"\\\(\=]/gi;
    if (regExp.test(e.target.value)) {
      alert("특수문자는 입력하실수 없습니다.");
      e.target.value = e.target.value.substring(0, e.target.value.length - 1); // 입력한 특수문자 한자리 지움
    }
  }, []);

  const checkNumericInput = useCallback((e) => {
    // 입력된 값이 숫자, 백스페이스, 삭제 키가 아니면 입력을 막습니다.
    if (!/^[0-9]*$/.test(e.key) && e.type === "keydown" && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  }, []);

  return { checkSpecialCharacters, checkNumericInput };
};

export default useCharacterCheck;
