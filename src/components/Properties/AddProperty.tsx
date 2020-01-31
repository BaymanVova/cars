import React, { useEffect, useState } from "react";
import { DefaultButton } from "../UI/DefaultButton/DefaultButton";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../UI/Input/Input";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styles from "../../assets/styles/addItem.module.scss";
import { RadioButton, RadioButtonGroup } from "../UI/Input/RadioButton";
import { newProperty } from "../../assets/utils/propertiesAPIRequest";
import * as actions from "../../store/actions/property-actions";
import { connect } from "react-redux";
import { MapState } from "../../store/interfaces/mapState";
import { LoadState } from "../../assets/utils/loadState";
import { Spinner } from "../common/Spinner/Spinner";
import { Property } from "../../store/reducers/car-reducers";
var classNames = require("classnames");

interface Props {
  loadState: LoadState;
  error: string;
  properties: Property[] | null;
  getProperty: () => Promise<any>;
  add: (property: newProperty) => Promise<void>;
  edit: (id: string, property: newProperty) => Promise<void>;
}
const AddPropertyPage: React.FC<Props> = props => {
  const { loadState, error, add, getProperty, properties, edit } = props;

  useEffect(() => {
    (async function() {
      getProperty();
    })();
  }, []);

  //** Для оповещений, при изменении статуса стора**//
  const [needNotification, setNotification] = useState(false);
  useEffect(() => {
    if (
      loadState === LoadState.added ||
      loadState === LoadState.edited ||
      loadState === LoadState.error
    ) {
      setNotification(true);
    }
  }, [loadState]);

  if (needNotification) {
    switch (loadState) {
      case LoadState.added:
        alert("Свойство успешно добавлено");
        setNotification(false);
        break;
      case LoadState.edited:
        setNotification(false);
        alert("Свойство успешно изменено");
        break;
      case LoadState.error:
        setNotification(false);
        alert(error);
        break;
      default:
        break;
    }
  }

  //** Для редактирования, заполняет поля исходными данными**//
  const [currentName, setName] = useState("");
  const [currentType, setType] = useState("");

  const { id } = useParams<{ id: string }>();
  //** Получить значения редактируемого объекта**//
  useEffect(() => {
    if (id) {
      console.log("id", id);
      if (properties) {
        console.log("properties", properties);
        const temp = properties.find(_ => _.idProperty === id);
        if (temp) {
          setName(temp.nameProperty);
          setType(temp.typeProperty);
        }
      }
    }
  }, [properties, id]);

  const history = useHistory();

  let location = useLocation();
  console.log(location);

  //** Отобразить форму или спинер **//
  const renderForm = (formik: any): React.ReactNode => {
    if (loadState === LoadState.loading) {
      return <Spinner />;
    } else {
      return (
        <div className={styles.inputGroup}>
          <Input
            id="name"
            classNameLabel={classNames(styles.labelText, styles.star)}
            hasErrors={!!(formik.touched.name && formik.errors.name)}
            errorText={formik.errors.name}
            label="Название свойства"
            placeHolder="Введите свойство"
            type="text"
            value={formik.values.name}
            {...formik.getFieldProps("name")}
          />
          <RadioButtonGroup
            id="typeProperty"
            label="Укажите тип свойства"
            classNameLabel={classNames(styles.labelText, styles.star)}
            value={formik.values.typeProperty}
            error={formik.errors.typeProperty}
            touched={formik.touched.typeProperty}
          >
            <Field
              component={RadioButton}
              name="typeProperty"
              id="Dropdown"
              label="Dropdown"
            />
            <Field
              component={RadioButton}
              name="typeProperty"
              id="Number"
              label="Number"
            />
            <Field
              component={RadioButton}
              name="typeProperty"
              id="String"
              label="String"
            />
          </RadioButtonGroup>
        </div>
      );
    }
  };

  // Для edit, ждём загрузки полей, для add сразу отображаем форму
  if (currentName || !location.pathname.includes("/property/edit")) {
    return (
      <>
        <Formik
          initialValues={{
            name: currentName,
            typeProperty: currentType
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Введите название свойства"),
            typeProperty: Yup.string().required("Выберите тип свойства")
          })}
          onSubmit={values => {
            getProperty().then(() => {
              const newProp = {
                nameProperty: values.name.trim(),
                typeProperty: values.typeProperty
              };
              if (location.pathname.includes("/property/edit")) {
                edit(id!, newProp);
              } else {
                add(newProp);
              }
              values.name = "";
              values.typeProperty = "";
            });
          }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <div className={classNames(styles.topMenu, styles.right)}>
                <DefaultButton
                  className={"error"}
                  disabled={false}
                  onClick={() => history.push("/property")}
                  text={"Вернуться"}
                />
                <DefaultButton
                  className={"success"}
                  disabled={false}
                  onClick={() => {}}
                  text={"Сохранить"}
                />
              </div>
              <h4 className={styles.headerTitle}>Добавление свойста</h4>
              {renderForm(formik)}
            </form>
          )}
        </Formik>
      </>
    );
  }
  return <Spinner />;
};
const mapStateToProps = ({ properties }: MapState) => {
  return {
    loadState: properties.loadState,
    error: properties.error,
    properties: properties.properties
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProperty: () => dispatch(actions.getProperty()),
    add: (property: newProperty) => dispatch(actions.addProperty(property)),
    edit: (id: string, property: newProperty) =>
      dispatch(actions.editProperty(id, property))
  };
};

export const AddProperty = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPropertyPage);
