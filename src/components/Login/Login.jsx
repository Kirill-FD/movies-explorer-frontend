import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";
import useFormValidation from '../../utils/useFormValidation';

export default function Login({ name, onLogin, setIsError }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function onSubmitUser(evt) {
    evt.preventDefault()
    onLogin(values.email, values.password)
  }

  return (
    <AuthPage name={name} isValid={isValid} onSubmit={onSubmitUser} setIsError={setIsError}>
      <Input
        name='email'
        type='email'
        title='E-mail'
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        placeholder='Введите вашу электронную почту'
      />
      <Input
        name='password'
        type='password'
        title='Пароль'
        minLength = '3'
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        placeholder='Введите ваш пароль'
      />
    </AuthPage>
  )
}