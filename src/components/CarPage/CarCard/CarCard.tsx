import React, { useEffect } from "react";
import DefaultButton from "../../UI/DefaultButton/DefaultButton";
import { Table } from "../../common/Table/Table";
import * as actions from "../../../store/actions/car-actions";
import { connect } from "react-redux";
import { MapState } from "../../../store/interfaces/mapState";
import { CarInfo } from "../../../store/reducers/car-reducers";
import styles from "../car.module.scss";

interface Props {
  cars: CarInfo[] | null;
  orderBy: string;
  isDesc: boolean;
  sortCars: (key: string) => void;
  getCars: () => void;
}
const CarCard: React.FC<Props> = props => {
  const { cars, sortCars, getCars, orderBy, isDesc } = props;
  useEffect(() => {
    getCars();
  }, []);

  if (cars) {
    return (
      <>
        <div className={`${styles.topMenu} ${styles.right}`}>
          <DefaultButton
            className={"warning"}
            disabled={false}
            onClick={(): void => {
              alert("Soon");
            }}
            text={"Добавить товар"}
          />
        </div>
        <Table
          values={cars}
          keys={[
            { key: "name", name: "Перечень товаров" },
            { key: "price", name: "Стоимость" },
            { key: "date", name: "Дата изменения" }
          ]}
          onClick={(key: string) => sortCars(key)}
          hasControl
          orderBy={orderBy}
          isDesc={isDesc}
          hasLink={true}
          linkKey={"name"}
          linkKeyValue={"id"}
        />
      </>
    );
  }
  // TODO: добавить спинер
  return <div>спинер</div>;
};
const mapStateToProps = ({ cars }: MapState) => {
  return {
    cars: cars.cars,
    orderBy: cars.orderBy,
    isDesc: cars.isDesc
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getCars: () => {
      dispatch(actions.getCars());
    },
    sortCars: (key: string) => {
      dispatch(actions.sort(key));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarCard);
