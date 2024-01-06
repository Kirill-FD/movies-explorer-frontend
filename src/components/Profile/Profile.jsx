import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { EmailRegex } from '../../utils/constants';
import Form from '../Form/Form'
import Input from '../Input/Input'
import useFormValidation from '../../utils/useFormValidation'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './Profile.css'

export default function Profile({ name, logOut, editUserData, setIsError, isSuccess, setSuccess, isEdit, setIsEdit }) {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

    useEffect(() => {
        reset({ username: currentUser.name, email: currentUser.email })
    }, [reset, currentUser, isEdit])

    function onSubmit(evt) {
        evt.preventDefault()
        editUserData(values.username, values.email)
    }

    return (
        <section className="profile profile__page">
            <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
            <Form
                name={name}
                isValid={isValid}
                onSubmit={onSubmit}
                setIsError={setIsError}
                values={values}
                isSuccess={isSuccess}
                setSuccess={setSuccess}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
            >
                <Input
                    selectName={name}
                    name='username'
                    type='text'
                    title='Имя'
                    minLength='3'
                    value={values.username}
                    isInputValid={isInputValid.username}
                    error={errors.username}
                    onChange={handleChange}
                    isEdit={isEdit}
                />
                <Input
                    selectName={name}
                    name='email'
                    type='email'
                    title='E-mail'
                    value={values.email}
                    isInputValid={isInputValid.email}
                    error={errors.email}
                    onChange={handleChange}
                    pattern={EmailRegex}
                    isEdit={isEdit}
                />
            </Form>
            <Link to='/' onClick={logOut} className='profile__link'>Выйти из аккаунта</Link>
        </section>
    )
}