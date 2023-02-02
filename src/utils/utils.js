import { useState, useEffect, useCallback } from 'react';
import { validationScheme } from '../utils/constants';

export const useClose = (isOpen, handleClose) => {
  useEffect(() => {
    if (!isOpen) return;
    function handleEscClick(evt) {
      if (evt.key === "Escape") {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscClick);
    return () => document.removeEventListener('keydown', handleEscClick);
  }, [isOpen]);
}

export const useFormWithValidation = ({initialValues} = {}) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.value;
    switch (name) {
      case 'username':
        target.validity.patternMismatch ? target.setCustomValidity(validationScheme.username.message) : target.setCustomValidity('')
        break;
      case 'email':
        target.validity.patternMismatch ? target.setCustomValidity(validationScheme.email.message) : target.setCustomValidity('')
        break;
      default: target.setCustomValidity('')
    }
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const resetValues = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  },
  [setValues, setErrors, setIsValid]);

  return { values, setValues, handleChange, errors, isValid, setIsValid, resetValues };
}
