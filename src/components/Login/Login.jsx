import { useEffect } from "react";
import Form from "../Form/Form";

function Login(props) {
  const { handleLogin, values, errors, onChange, isValid, setServerError } = props;

  useEffect(() => {
    setServerError("");
  }, [setServerError]);

  return (
    <section>
      <Form
        isRegister={false}
        link="/signup"
        title="Рады видеть!"
        email="pochta@yandex.ru"
        submitText="Войти"
        formText="Ещё не зарегистрированы?"
        linkText="Регистрация"
        submitButtonLogin="form__submit-button-login"
        onSubmit={handleLogin}
        values={values}
        errors={errors}
        onChange={onChange}
        isValid={isValid}
        setServerError={setServerError}
      />
    </section>
  );
}

export default Login;
