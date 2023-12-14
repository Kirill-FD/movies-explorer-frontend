import './Form.css'

export default function Form({ name, children, isValid, onSubmit }) {

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className='login__error-req'>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
            disabled={!isValid}
          >{'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className='login__error-req login__error-req_type_reg'>{'При регистрации произошла ошибка.'}</span>
            <button type="submit" className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}>{'Зарегистрироваться'}</button>
          </>
          :
          <>
            <span className='profile__error-req'>{'При обновлении профиля произошла ошибка.'}</span>
            <button type="submit" className='profile__submit'>{'Редактировать'}</button>
          </>
      }
    </form>
  )
}