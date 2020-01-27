import React, { useEffect, useState } from "react";
import DefaultButton from "../../UI/DefaultButton/DefaultButton";
import { Table } from "../../common/Table/Table";
import * as actions from "../../../store/actions/car-actions";
import { connect } from "react-redux";
import { MapState } from "../../../store/interfaces/mapState";
import { CarInfo } from "../../../store/reducers/car-reducers";
import styles from "../car.module.scss";
import { Spinner } from "../../common/Spinner/Spinner";
import { useHistory } from "react-router";
import { LoadState } from "../../../assets/utils/loadState";

var classNames = require("classnames");

interface Props {
  cars: CarInfo[] | null;
  orderBy: string;
  isDesc: boolean;
  loadState: LoadState;
  error: string;
  sortCars: (key: string) => void;
  getCars: () => void;
  deleteCar: (id: string) => Promise<void>;
}
const CarCard: React.FC<Props> = props => {
  const {
    cars,
    sortCars,
    loadState,
    error,
    getCars,
    orderBy,
    isDesc,
    deleteCar
  } = props;

  useEffect(() => {
    getCars();
  }, []);

  let history = useHistory();

  const [, SetPageState] = useState(loadState);
  const [needNotification, setNotification] = useState(false);

  useEffect(() => {
    SetPageState(loadState);
    setNotification(true);
  }, [loadState]);

  if (needNotification) {
    switch (loadState) {
      case LoadState.deleted:
        alert("Товар успешно удален");
        setNotification(false);
        break;
      case LoadState.edited:
        setNotification(false);
        break;
      case LoadState.error:
        setNotification(false);
        alert(error);
        break;
      default:
        break;
    }
  }

  const renderDate = (text: any) => {
    return new Date(text).toLocaleDateString();
  };

  const delCar = (id: string) => {
    deleteCar(id).then(() => getCars());
  };

  if (loadState === LoadState.loading) {
    return <Spinner />;
  }
  if (cars) {
    return (
      <>
        <div className={classNames(styles.topMenu, styles.right)}>
          <DefaultButton
            className={"warning"}
            disabled={false}
            onClick={(): void => {
              history.push("/car/add");
            }}
            text={"Добавить товар"}
          />
        </div>
        <Table
          values={cars}
          keys={[
            { key: "name", name: "Перечень товаров" },
            { key: "price", name: "Стоимость" },
            {
              key: "date",
              name: "Дата изменения",
              render: renderDate
            }
          ]}
          onClick={(key: string) => sortCars(key)}
          hasControl
          orderBy={orderBy}
          isDesc={isDesc}
          hasLink={true}
          linkKey={"name"}
          linkKeyValue={"id"}
          idNameInValues={"id"}
          deleteFunc={delCar}
        />
      </>
    );
  }
  return <Spinner />;
};
const mapStateToProps = ({ cars }: MapState) => {
  return {
    cars: cars.cars,
    orderBy: cars.orderBy,
    isDesc: cars.isDesc,
    loadState: cars.loadState,
    error: cars.error
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getCars: () => dispatch(actions.getCars()),
    sortCars: (key: string) => dispatch(actions.sort(key)),
    deleteCar: (id: string) => dispatch(actions.deleteCar(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarCard);
