import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input } from "../UI/Input/Input";
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import * as actions from "../../store/actions/auth-actions";
import styles from "../Login/login.module.scss";

const Registration = (props: any) => {
  const { error, onRegistration } = props;
  return (
    <div className={styles.login}>
      <h1>Регистрация</h1>
      {error && <p>{error.message}</p>}
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
            .max(15, "Must be 15 characters or less")
            .required("Введите логин"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Введите пароль"),
          confirmPassword: Yup.string()
            .min(6, "Must be 6 characters or more")
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
              name="firstName"
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
              name="lastName"
              hasErrors={!!(formik.touched.lastName && formik.errors.lastName)}
              errorText={formik.errors.lastName}
              label="Фамилия"
              placeHolder="Введите фамилию"
              type="text"
              value={formik.values.lastName}
              {...formik.getFieldProps("lastName")}
            />
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
            <Input
              name="confirmPassword"
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

            <DefaultButton
              className="warning"
              disabled={false}
              type="submit"
              text="Войти"
            />
          </form>
        )}
      </Formik>
      <NavLink to="/" className={styles.link}>
        Вернуться
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    error: state.auth.error
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
