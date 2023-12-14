import './Input.css'

export default function Input({ selectName, name, type, title, minLength, value, isInputValid, error, onChange }) {

  return (
    <>
      {selectName !== 'profile' ?
        <label className='login__label'>
          <span className='login__subtitle'>{title}</span>
          <input
            type={type}
            name={name}
            minLength={minLength || ''}
            className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invaid'}`}
            value={value || ''}
            onChange={onChange}
            required
            autoComplete='on'
          />
          <span className='login__error'>{error}</span>
        </label>
        :
        <>
        <label className='profile__label'>
          <span className='profile__subtitle'>{title}</span>
          <input
            type={type}
            name={name}
            minLength={minLength || ''}
            className={`profile__input ${isInputValid === undefined || isInputValid ? '' : 'profile__input_invalid'}`}
            value={value || ''}
            onChange={onChange}
            required
          />
        </label>
        <span className={`profile__error ${name === 'username' ? 'profile__error_type_name' : ''}`}>{error}</span>
        </>
      }
    </>
  )
}