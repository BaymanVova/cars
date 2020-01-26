import React, { useEffect, useState, Fragment } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Input } from "../../UI/Input/Input";
import * as actions from "../../../store/actions/property-actions";
import * as actionsCar from "../../../store/actions/car-actions";
import { connect } from "react-redux";
import { MapState } from "../../../store/interfaces/mapState";
import { CarInfo, Property } from "../../../store/reducers/car-reducers";
import { Spinner } from "../../common/Spinner/Spinner";
import styles from "../../../assets/styles/addItem.module.scss";
import DefaultButton from "../../UI/DefaultButton/DefaultButton";
import { useHistory } from "react-router";
import * as Yup from "yup";

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
  getProperties: () => void;
  addCar: (newCar: CarInfo) => void;
}

const AddCar: React.FC<Props> = props => {
  const { properties, getProperties, addCar } = props;
  const [initialState, setInitialState] = useState<FormState>({
    name: "",
    price: 0,
    image: "",
    description: "",
    fields: [],
    property: null
  });

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    if (properties !== null) {
      const tempProp: string[] = properties.map(
        (el: Property) => el.nameProperty
      );
      setInitialState({
        name: "",
        price: 0,
        image: "",
        description: "",
        fields: [],
        property: tempProp
      });
    }
  }, [properties]);

  const history = useHistory();

  const calcLeftProperty = (values: FormState) => {
    // Все свойства
    let leftProperties: string[] = properties!.map(
      (el: Property) => el.nameProperty
    );
    //Считаем использованные свойства
    let usedProperties: string[] = [];
    console.log(values.fields);
    if (values.fields) {
      usedProperties = values.fields.map(_ => _.type);
      // Убираем использованные свойства
      leftProperties = values.property!.filter(
        (el: any) => usedProperties.indexOf(el) < 0
      );

      // Добавляем допустимые свойства
      values.fields.map((el: any, index) => {
        console.log(`До изменения: ${index}`, el.availableProps);
        el.availableProps = [el.type, ...leftProperties];
        console.log(`после изменения: ${index}`, el.availableProps);
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
          <div className={styles.valuesField}>
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
                console.log("удаляем: ", index);
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
    console.log(fields);
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
            console.log(JSON.stringify(values, null, 2));
            const newCar: CarInfo = {
              name: values.name,
              description: values.description,
              image: values.image,
              price: values.price,
              date: new Date(),
              properties: getCarProperties(values.fields)
            };
            console.log("newCar", newCar);
            addCar(newCar);
          }}
          render={({ values, handleChange, errors, touched, ...rest }) => (
            <Form>
              {console.log("values", errors, touched, rest)}
              <div className={`${styles.topMenu} ${styles.right}`}>
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
                  classNameLabel={styles.labelText}
                  hasErrors={!!(touched.name && errors.name)}
                  errorText={errors.name}
                  label="Название товара*"
                  placeHolder="Введите название"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                />
                <Input
                  id="price"
                  classNameLabel={styles.labelText}
                  hasErrors={!!(touched.price && errors.price)}
                  errorText={errors.price}
                  label="Стоимость товара**"
                  placeHolder="Введите стоимость"
                  type="text"
                  value={values.price.toString()}
                  onChange={handleChange}
                />
                <Input
                  id="image"
                  classNameLabel={styles.labelText}
                  hasErrors={!!(touched.image && errors.image)}
                  errorText={errors.image}
                  label="Изображение*"
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
                  console.log(arrayHelpers);
                  return (
                    <>
                      <div className={styles.headerTitle}>
                        <h4>Добавление товару свойств</h4>
                        {values.fields.length < values.property!.length && (
                          <button
                            className={styles.add}
                            type="button"
                            id={"addPropertyField"}
                            onClick={() => {
                              arrayHelpers.insert(values.fields.length, {
                                type: leftProperties[0],
                                value: [""],
                                availableProps: leftProperties
                              });
                            }}
                          >
                            +
                          </button>
                        )}
                      </div>
                      <div className={styles.propertiesBox}>
                        {values.fields && values.fields.length > 0
                          ? values.fields.map((field, index) => (
                              <Fragment key={field.type}>
                                {console.log("key", field.type)}
                                <div className={styles.propertiesField}>
                                  <button
                                    className={styles.remove}
                                    type="button"
                                    onClick={() => {
                                      console.log(
                                        "удаляем: ",
                                        arrayHelpers.form.values.fields,
                                        index
                                      );
                                      arrayHelpers.remove(index);
                                      console.log("удаляем: ", arrayHelpers);
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
                                        console.log(
                                          "Добавить ещё значений",
                                          values.fields[index]
                                        );
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

const mapStateToProps = ({ properties }: MapState) => {
  return {
    properties: properties.properties
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProperties: () => dispatch(actions.getProperty()),
    addCar: (newCar: CarInfo) => dispatch(actionsCar.addCar(newCar))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCar);
