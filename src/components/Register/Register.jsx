import { EmailRegex } from "../../utils/constants";
import Input from "../Input/Input";
import AuthPage from "../AuthPage/AuthPage";
import useFormValidation from "../../utils/useFormValidation";

export default function Register({ name, onRegister, setIsError }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

    function handleRegister(evt) {
        evt.preventDefault()
        onRegister(values.username, values.email, values.password)
    }

    return (
        <AuthPage name={name} isValid={isValid} onSubmit={handleRegister} setIsError={setIsError}>
            <Input
                name='username'
                type='text'
                title='Имя'
                minLength='2'
                value={values.username}
                isInputValid={isInputValid.username}
                error={errors.username}
                onChange={(evt) => {
                    handleChange(evt)
                    setIsError(false)
                }}
                placeholder='Введите ваше имя'
            />
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
                pattern={EmailRegex}
                placeholder='Введите вашу электронную почту'
            />
            <Input
                name='password'
                type='password'
                title='Пароль'
                minLength='3'
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