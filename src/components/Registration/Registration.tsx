import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input } from "../UI/Input/Input";
import { DefaultButton } from "../UI/DefaultButton/DefaultButton";
import * as actions from "../../store/actions/auth-actions";
import styles from "../Login/login.module.scss";
import { MapState } from "../../store/interfaces/mapState";

interface Props {
  error: string | null;
  onRegistration: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}
const RegistrationPage: React.FC<Props> = props => {
  const { error, onRegistration } = props;
  return (
    <div className={styles.login}>
      <h1>Регистрация</h1>
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          login: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(2, "Имя должно быть больше двух символов")
            .required("Укажите имя"),
          lastName: Yup.string()
            .min(2, "Фамилия должна быть больше двух символов")
            .required("Укажите фамилию"),
          login: Yup.string()
            .required("Введите логин")
            .email("Введите правильный почтовый адрес"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Введите пароль"),
          confirmPassword: Yup.string()
            .min(6, "Must be 6 characters or more")
            .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
            .required("Повторите пароль")
        })}
        onSubmit={values => {
          onRegistration(
            values.firstName,
            values.lastName,
            values.login,
            values.password
          );
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <Input
              id="firstName"
              hasErrors={
                !!(formik.touched.firstName && formik.errors.firstName)
              }
              errorText={formik.errors.firstName}
              label="Имя"
              placeHolder="Введите имя"
              type="text"
              value={formik.values.firstName}
              {...formik.getFieldProps("firstName")}
            />
            <Input
              id="lastName"
              hasErrors={!!(formik.touched.lastName && formik.errors.lastName)}
              errorText={formik.errors.lastName}
              label="Фамилия"
              placeHolder="Введите фамилию"
              type="text"
              value={formik.values.lastName}
              {...formik.getFieldProps("lastName")}
            />
            <Input
              id="login"
              hasErrors={!!(formik.touched.login && formik.errors.login)}
              errorText={formik.errors.login}
              label="Логин"
              placeHolder="Введите e-mail"
              type="text"
              value={formik.values.login}
              {...formik.getFieldProps("login")}
            />
            <Input
              id="password"
              disabled={false}
              hasErrors={!!(formik.touched.password && formik.errors.password)}
              errorText={formik.errors.password}
              label="Пароль"
              placeHolder="Введите пароль"
              type="password"
              value={formik.values.password}
              {...formik.getFieldProps("password")}
            />
            <Input
              id="confirmPassword"
              disabled={false}
              hasErrors={
                !!(
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                )
              }
              errorText={formik.errors.confirmPassword}
              label="Повторите пароль"
              placeHolder="Повторите пароль"
              type="password"
              value={formik.values.confirmPassword}
              {...formik.getFieldProps("confirmPassword")}
            />

            <DefaultButton className="warning" disabled={false} text="Войти" />
          </form>
        )}
      </Formik>
      <NavLink to="/" className={styles.link}>
        Вернуться
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
    onRegistration: (
      firstName: string,
      lastName: string,
      email: string,
      password: string
    ) => {
      dispatch(actions.registarion(firstName, lastName, email, password));
    }
  };
};

export const Registration = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage);
