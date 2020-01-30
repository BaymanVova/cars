import React, { Fragment, useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Input } from "../../UI/Input/Input";
import * as actions from "../../../store/actions/property-actions";
import * as actionsCar from "../../../store/actions/car-actions";
import { connect } from "react-redux";
import { MapState } from "../../../store/interfaces/mapState";
import { CarInfo, Property } from "../../../store/reducers/car-reducers";
import { Spinner } from "../../common/Spinner/Spinner";
import styles from "../../../assets/styles/addItem.module.scss";
import DefaultButton from "../../UI/DefaultButton/DefaultButton";
import { useHistory, useLocation, useParams } from "react-router";
import * as Yup from "yup";
import { LoadState } from "../../../assets/utils/loadState";
var classNames = require("classnames");

interface Field {
  type: string;
  value: string[];
  availableProps: string[];
}
interface FormState {
  name: string;
  price: number;
  image: string;
  description: string;
  fields: Field[];
  property: string[] | null;
}
interface Props {
  properties: Property[] | null;
  loadStateProps: LoadState;
  loadState: LoadState;
  error: string;
  cars: CarInfo[] | null;
  getProperties: () => void;
  getCars: () => void;
  addCar: (newCar: CarInfo) => void;
  editCar: (id: string, newCar: CarInfo) => Promise<void>;
}

const AddCar: React.FC<Props> = props => {
  const {
    properties,
    loadStateProps,
    loadState,
    error,
    cars,
    getProperties,
    getCars,
    addCar,
    editCar
  } = props;
  const [initialState, setInitialState] = useState<FormState>({
    name: "",
    price: 0,
    image: "",
    description: "",
    fields: [],
    property: null
  });

  const history = useHistory();
  let location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname.includes("/car/edit")) {
      getCars();
    }
    getProperties();
  }, []);

  useEffect(() => {
    console.log("Сменились пропсы или кары");
    if (properties !== null) {
      const tempProp: string[] = properties.map(
        (el: Property) => el.nameProperty
      );
      if (location.pathname.includes("/car/edit")) {
        if (cars) {
          console.log("заполнились кары", cars);
          const currentCar = cars!.find(_ => _.id === id);
          if (currentCar) {
            const fieldTemp = currentCar.properties.map((el: Property) => {
              return {
                type: el.nameProperty,
                value: [...el.valueProperty],
                availableProps: []
              };
            });
            setInitialState({
              name: currentCar.name,
              price: currentCar.price,
              image: currentCar.image,
              description: currentCar.description,
              fields: fieldTemp,
              property: tempProp
            });
          }
        }
      } else {
        setInitialState({
          name: "",
          price: 0,
          image: "",
          description: "",
          fields: [],
          property: tempProp
        });
      }
    }
    console.log("начальное состояние", initialState);
  }, [properties, cars]);

  const [needNotification, setNotification] = useState(false);

  useEffect(() => {
    setNotification(true);
  }, [loadState]);

  if (needNotification) {
    switch (loadState) {
      case LoadState.added:
        alert("Товар успешно добавлен");
        setNotification(false);
        break;
      case LoadState.edited:
        alert("Товар успешно изменен");
        setNotification(false);
        break;
      case LoadState.error:
        alert(error);
        setNotification(false);
        break;
      default:
        break;
    }
  }

  const calcLeftProperty = (values: FormState) => {
    // Все свойства
    let leftProperties: string[] = properties!.map(
      (el: Property) => el.nameProperty
    );
    //Считаем использованные свойства
    let usedProperties: string[] = [];
    if (values.fields) {
      usedProperties = values.fields.map(_ => _.type);
      // Убираем использованные свойства
      leftProperties = values.property!.filter(
        (el: any) => usedProperties.indexOf(el) < 0
      );

      // Добавляем допустимые свойства
      values.fields.map((el: any) => {
        el.availableProps = [el.type, ...leftProperties];
      });
    }

    return leftProperties;
  };

  const isDropDown = (propName: string): boolean => {
    let isSelect: boolean = false;
    if (properties !== null) {
      let prop = properties.filter(
        _ => _.nameProperty === propName && _.typeProperty === "Dropdown"
      );
      if (prop.length > 0) {
        isSelect = true;
      }
    }
    return isSelect;
  };
  const renderDropDownValues = (
    fieldIndex: number,
    values: string[],
    handleChange: any,
    deleteValue: (innerIndex: number) => void
  ) => {
    return values.map((el: string, index: number) => {
      if (index !== 0) {
        return (
          <div key={index} className={styles.valuesField}>
            <Input
              id={`fields.${fieldIndex}.value.${index}`}
              hasErrors={false}
              label={""}
              type={"text"}
              value={values[index]}
              onChange={handleChange}
              key={`fields.${fieldIndex}.value.${index}`}
            />
            <button
              className={styles.remove}
              type="button"
              onClick={() => {
                deleteValue(index);
              }}
            >
              -
            </button>
          </div>
        );
      }
    });
  };

  const getCarProperties = (fields: Field[]): Property[] => {
    let props: Property[] = [];
    fields.map((el: Field) => {
      const temp = properties!.find(_ => _.nameProperty === el.type);
      if (temp) {
        const newProp: Property = {
          idProperty: temp.idProperty,
          nameProperty: temp.nameProperty,
          typeProperty: temp.typeProperty,
          valueProperty: el.value
        };
        props.push(newProp);
      }
    });
    return props;
  };

  if (loadState === LoadState.loading || loadStateProps === LoadState.loading) {
    return <Spinner />;
  }
  if (initialState.property) {
    return (
      <div>
        <Formik
          initialValues={initialState}
          validationSchema={Yup.object({
            name: Yup.string().required("Введите название товара"),
            price: Yup.number()
              .typeError("Стоимость должна быть числом")
              .required("Введите стоимость товара")
              .moreThan(0, "Стоимость должна быть положительным числом"),
            image: Yup.string().required("Добавьте ссылку на изображение")
          })}
          onSubmit={values => {
            const newCar: CarInfo = {
              name: values.name,
              description: values.description,
              image: values.image,
              price: values.price,
              date: new Date(),
              properties: getCarProperties(values.fields)
            };
            if (location.pathname.includes("/car/edit")) {
              editCar(id!, newCar).then(() => getCars());
              // Необходимо для вызова перерендера Formik
              setInitialState({
                name: "",
                price: 0,
                image: "",
                description: "",
                fields: [],
                property: null
              });
            } else {
              addCar(newCar);
            }
          }}
          render={({ values, handleChange, errors, touched }) => (
            <Form>
              <div className={classNames(styles.topMenu, styles.right)}>
                <DefaultButton
                  className={"error"}
                  disabled={false}
                  onClick={() => history.push("/car")}
                  text={"Вернуться"}
                />
                <DefaultButton
                  className={"success"}
                  disabled={false}
                  onClick={() => {}}
                  text={"Сохранить"}
                />
              </div>
              <div className={styles.headerTitle}>
                <h4>Добавление товара</h4>
              </div>
              <div className={styles.mainProperty}>
                <Input
                  id="name"
                  classNameLabel={classNames(styles.labelText, styles.star)}
                  hasErrors={!!(touched.name && errors.name)}
                  errorText={errors.name}
                  label="Название товара"
                  placeHolder="Введите название"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                />
                <Input
                  id="price"
                  classNameLabel={classNames(styles.labelText, styles.star)}
                  hasErrors={!!(touched.price && errors.price)}
                  errorText={errors.price}
                  label="Стоимость товара"
                  placeHolder="Введите стоимость"
                  type="text"
                  value={values.price.toString()}
                  onChange={handleChange}
                />
                <Input
                  id="image"
                  classNameLabel={classNames(styles.labelText, styles.star)}
                  hasErrors={!!(touched.image && errors.image)}
                  errorText={errors.image}
                  label="Изображение"
                  placeHolder="Ссылка на изображение"
                  type="text"
                  value={values.image}
                  onChange={handleChange}
                />
                <Input
                  id="description"
                  classNameLabel={styles.labelText}
                  hasErrors={false}
                  label="Описание"
                  placeHolder="Описание товара"
                  type="area"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>
              <FieldArray
                name="fields"
                render={arrayHelpers => {
                  const leftProperties = calcLeftProperty(values);
                  return (
                    <>
                      <div className={styles.headerTitle}>
                        <h4>Добавление товару свойств</h4>
                        {(!values.fields ||
                          values.fields.length < values.property!.length) && (
                          <button
                            className={styles.add}
                            type="button"
                            id={"addPropertyField"}
                            onClick={() => {
                              arrayHelpers.insert(
                                values.fields ? values.fields.length : 0,
                                {
                                  type: leftProperties[0],
                                  value: [""],
                                  availableProps: leftProperties
                                }
                              );
                            }}
                          >
                            +
                          </button>
                        )}
                      </div>
                      <div className={styles.propertiesBox}>
                        {console.log("values.fields", values.fields)}
                        {values.fields && values.fields.length > 0
                          ? values.fields.map((field, index) => (
                              <Fragment key={field.type}>
                                <div className={styles.propertiesField}>
                                  <button
                                    className={styles.remove}
                                    type="button"
                                    onClick={() => {
                                      arrayHelpers.remove(index);
                                    }}
                                  >
                                    -
                                  </button>
                                  <Input
                                    id={`fields.${index}.type`}
                                    name={`fields.${index}.type`}
                                    hasErrors={false}
                                    label={`Свойство ${index + 1}`}
                                    type={"Dropdown"}
                                    value={values.fields[index].availableProps}
                                    onChange={handleChange}
                                  />
                                  <Input
                                    id={`fields.${index}.value.0`}
                                    hasErrors={false}
                                    label={"Значение"}
                                    type={"text"}
                                    value={values.fields[index].value[0]}
                                    onChange={handleChange}
                                  />
                                </div>
                                {isDropDown(values.fields[index].type) && (
                                  <div className={styles.selectValues}>
                                    {renderDropDownValues(
                                      index,
                                      values.fields[index].value,
                                      handleChange,
                                      (innerIndex: number) => {
                                        const newValues = [
                                          ...values.fields[index].value
                                        ];
                                        newValues.splice(innerIndex, 1);
                                        arrayHelpers.replace(index, {
                                          type: values.fields[index].type,
                                          value: newValues,
                                          availableProps:
                                            values.fields[index].availableProps
                                        });
                                      }
                                    )}
                                    <button
                                      type="button"
                                      id={"myButton"}
                                      className={styles.add}
                                      onClick={() => {
                                        const newValues = [
                                          ...values.fields[index].value,
                                          ""
                                        ];
                                        arrayHelpers.replace(index, {
                                          type: values.fields[index].type,
                                          value: newValues,
                                          availableProps:
                                            values.fields[index].availableProps
                                        });
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </Fragment>
                            ))
                          : null}
                      </div>
                    </>
                  );
                }}
              />
            </Form>
          )}
        />
      </div>
    );
  } else {
    return <Spinner />;
  }
};

const mapStateToProps = ({ properties, cars }: MapState) => {
  return {
    properties: properties.properties,
    loadStateProps: properties.loadState,
    loadState: cars.loadState,
    error: cars.error,
    cars: cars.cars
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProperties: () => dispatch(actions.getProperty()),
    getCars: () => dispatch(actionsCar.getCars()),
    addCar: (newCar: CarInfo) => dispatch(actionsCar.addCar(newCar)),
    editCar: (id: string, newCar: CarInfo) =>
      dispatch(actionsCar.editCar(id, newCar))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCar);
