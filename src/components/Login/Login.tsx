import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input } from "../UI/Input/Input";
import styles from "./login.module.scss";
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import * as actions from "../../store/actions/auth-actions";
import { MapState } from "../../store/interfases/mapState";

interface Props {
  error: string | null;
  onAuth: (email: string, password: string) => void;
}

const Login: React.FC<Props> = props => {
  const { error, onAuth } = props;

  return (
    <div className={styles.login}>
      <h1>Вход</h1>
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={{
          login: "",
          password: ""
        }}
        validationSchema={Yup.object({
          login: Yup.string()
            .email("Введите правильный почтовый адрес")
            .required("Введите логин"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Введите пароль")
        })}
        onSubmit={values => {
          onAuth(values.login, values.password);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Input
              name="login"
              hasErrors={!!(formik.touched.login && formik.errors.login)}
              errorText={formik.errors.login}
              label="Логин"
              placeHolder="Введите логин"
              type="text"
              value={formik.values.login}
              {...formik.getFieldProps("login")}
            />
            <Input
              name="password"
              disabled={false}
              hasErrors={!!(formik.touched.password && formik.errors.password)}
              errorText={formik.errors.password}
              label="Пароль"
              placeHolder="Введите пароль"
              type="password"
              value={formik.values.password}
              {...formik.getFieldProps("password")}
            />
            <DefaultButton className="warning" disabled={false} text="Войти" />
          </form>
        )}
      </Formik>
      <NavLink to="/signup" className={styles.link}>
        Зарегистрироваться
      </NavLink>
    </div>
  );
};

const mapStateToProps = ({ auth }: MapState) => {
  return {
    error: auth.error
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuth: (email: string, password: string) => {
      console.log(email, password);
      dispatch(actions.auth(email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
