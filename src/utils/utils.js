import { useState, useCallback } from 'react';
import { validationScheme } from '../utils/constants';

export const useFormWithValidation = ({baseInput} = {}) => {
  const [inputData, setInputData] = useState(baseInput || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleUpdateData = (evt) => {
    const target = evt.target;
    switch (target.name) {
      case 'username':
        target.validity.patternMismatch
          ? target.setCustomValidity(validationScheme.username.message)
          : target.setCustomValidity('')
        break;
      case 'email':
        target.validity.patternMismatch
          ? target.setCustomValidity(validationScheme.email.message)
          : target.setCustomValidity('')
        break;
      default: target.setCustomValidity('')
    }
    setInputData({ ...inputData, [target.name]: target.value });
    setErrors({ ...errors, [target.name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetData = useCallback(
    (updatedInput = {}, updatedErrors = {}, updatedValidity = false) => {
      setInputData(updatedInput);
      setErrors(updatedErrors);
      setIsValid(updatedValidity);
    },
    [setInputData, setErrors, setIsValid]
  );

  return { handleUpdateData, inputData, setInputData, errors, resetData, isValid, setIsValid };
}
