import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'
import ErrorContext from '../../contexts/ErrorContext'
import SendContext from '../../contexts/SendContext'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './Form.css'

export default function Form({ name, children, isValid, onSubmit, values, isSuccess, setSuccess, setIsEdit, isEdit }) {

  const location = useLocation()
  const isError = useContext(ErrorContext)
  const isSend = useContext(SendContext)
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    if (location.pathname === '/profile') {
      setSuccess(false)
      setIsEdit(false)
    }
  }, [setSuccess, setIsEdit, location])

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className={`login__error-req ${isError && 'login__error-req_active'}`}>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
          >{isSend ? <Preloader name='button' /> : 'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className={`login__error-req login__error-req_type_reg ${isError && 'login__error-req_active'}`}>{'При регистрации произошла ошибка.'}</span>
            <button
              type="submit"
              className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend || isError}
            >{isSend ? <Preloader name='button' /> : 'Зарегистрироваться'}</button>
          </>
          : !isEdit ?
            <>
              <span className={`profile__error-req ${isError ? 'profile__error-req_type_error' : isSuccess && 'profile__error-req_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(true)
                  setSuccess(false)
                }}
              >{'Редактировать'}</button>
            </> :
            <>
              <span className={`profile__error-req ${isError ? 'profile__error-req_type_error' : isSuccess && 'profile__error-req_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
              <button
                type="submit"
                className={`login__submit ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'login__submit_disabled' : ''}`}
                disabled={!isValid || isSend || isError}
              >{isSend ? <Preloader name='button' /> : 'Сохранить'}</button>
            </>
      }
    </form>
  )
}