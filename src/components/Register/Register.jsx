import { useEffect } from "react";
import Form from "../Form/Form";

function Register(props) {
  const { handleRegister, values, errors, onChange, isValid, setServerError } = props;

  useEffect(() => {
    setServerError("");
  }, [setServerError]);

  return (
    <section>
      <Form
        isRegister={true}
        setServerError={setServerError}
        title="Добро пожаловать!"
        submitText="Зарегистрироваться"
        submitButtonLogin=""
        link="/signin"
        formText="Уже зарегистрированы?"
        linkText="Войти"
        onSubmit={handleRegister}
        values={values}
        errors={errors}
        onChange={onChange}
        isValid={isValid}
      />
    </section>
  );
}

export default Register;
