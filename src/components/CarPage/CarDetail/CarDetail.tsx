import React, { useEffect } from "react";
import { MapState } from "../../../store/interfaces/mapState";
import * as actions from "../../../store/actions/car-actions";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { CarInfo, Property } from "../../../store/reducers/car-reducers";
import styles from "../car.module.scss";
import { DefaultButton } from "../../UI/DefaultButton/DefaultButton";
import { Link } from "react-router-dom";
import { LoadState } from "../../../assets/utils/loadState";
import { Spinner } from "../../common/Spinner/Spinner";
import { DropDown } from "../../UI/Input/Dropdown";

interface Props {
  car: CarInfo | null;
  isLoading: LoadState;
  getCars: () => Promise<any>;
  getCarById: (id: string) => void;
}

const CarDetailPage: React.FC<Props> = props => {
  const { car, isLoading, getCars, getCarById } = props;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getCars().then(() => getCarById(id));
  }, [id]);

  const renderProperties = (properties: Property[]): React.ReactNode => {
    console.log("properties", properties);
    if (properties) {
      return properties.map((item: Property) => {
        if (item.typeProperty === "Dropdown") {
          return (
            <div className={styles.property} key={item.idProperty}>
              <DropDown
                id={item.idProperty.toString()}
                hasErrors={false}
                label={item.nameProperty}
                value={item.valueProperty}
              />
            </div>
          );
        } else {
          return (
            <div key={item.idProperty} className={styles.property}>
              <p className={styles.propertyHeader}>{item.nameProperty}</p>
              <p className={styles.propertyData}>{item.valueProperty}</p>
            </div>
          );
        }
      });
    } else return null;
  };

  if (isLoading === LoadState.loading) {
    return <Spinner />;
  }
  if (!car) {
    console.log("not found");
    return <div>Информация об автомобиле отсутствует</div>;
  }
  return (
    <>
      <div className={styles.topMenu}>
        <Link to={"/car"}>Вернуться</Link>
      </div>
      <div className={styles.carDetail}>
        <div className={styles.mainInfo}>
          <div className={styles.photo}>
            <img src={car.image} alt="Изображение автомобиля" />
          </div>
          <div className={styles.title}>
            <h2>{car.name}</h2>
          </div>
          <article>{car.description}</article>
        </div>
        <div>{renderProperties(car.properties)}</div>
        <div className={styles.property}>
          <p className={styles.propertyHeader}>Стоимость</p>
          <div className={styles.buyBlock}>
            <p className={styles.price}>{car.price}$</p>
            {/*Непонятно, должна ли кнопка Купить быть на одном уровне с ценой*/}
            <div>
              <DefaultButton
                className={"warning"}
                text={"Беру!!!"}
                onClick={() => alert("Поздравляем с покупкой")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ cars }: MapState) => {
  return {
    car: cars.currentCar,
    isLoading: cars.loadState
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCars: () => dispatch(actions.getCars()),
    getCarById: (id: string) => dispatch(actions.getCarById(id))
  };
};

export const CarDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(CarDetailPage);
