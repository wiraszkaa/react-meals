import {useState} from "react";

const useInput = (validate) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [enteredValueTouched, setEnteredValueTouched] = useState(false);

    const valueIsValid = validate(enteredValue);
    const hasError = !valueIsValid && enteredValueTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
        setEnteredValueTouched(true);
    };

    const inputBlurHandler = (event) => {
        setEnteredValueTouched(true);
    };

    const reset = () => {
      setEnteredValue('');
      setEnteredValueTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    }
};

export default useInput;