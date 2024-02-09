import { useState } from "react";

export default function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  const onChange = (e) => {
    const { name, value, form } = e.target;
    const valid = e.target.validity.valid;

    setValues((values) => ({ ...values, [name]: value }));

    setErrors((error) => ({ ...error, [name]: e.target.validationMessage }));

    setIsInputValid((validity) => ({...validity, [name]: valid}))
    
    setIsValid(form.checkValidity());
  };

  const resetValidation = (values = {}, errors = {}) => {
    setValues(values);
    setErrors(errors);
  };

  return {
    values,
    errors,
    isValid,
    isInputValid,
    onChange,
    setValues,
    resetValidation,
  };
}


// import { useCallback, useState } from "react";

// export default function useValidation() {
//   const [values, setValues] = useState({})
//   const [errors, setErrors] = useState({})
//   const [isInputValid, setIsInputValid] = useState({})
//   const [isValid, setIsValid] = useState(false)

//   function onChange(evt) {

//     const name = evt.target.name
//     const value = evt.target.value
//     const validationMessage = evt.target.validationMessage
//     const valid = evt.target.validity.valid
//     const form = evt.target.form
    
//     setIsInputValid((oldInputValid) => {
//       return { ...oldInputValid, [name]: valid }
//     })

//     setValues((oldValues) => {
//       return { ...oldValues, [name]: value }
//     })

//     setErrors(oldErrors => {
//       return { ...oldErrors, [name]: validationMessage }
//     })

//     setIsValid(form.checkValidity())
//   }

//   const setValue = useCallback((name, value) => {
//     setValues((oldValues) => {
//       return { ...oldValues, [name]: value }
//     })
//   }, [])

//   const resetValidation = useCallback((data = {}) => {
//     setValues(data)
//     setErrors({})
//     setIsInputValid({})
//     setIsValid(false)
//   },[])
  
//   return { values, errors, isValid, isInputValid, onChange, setValue, resetValidation }
// }