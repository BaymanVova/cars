import React, { useEffect } from "react";
import { Table } from "../common/Table/Table";
import * as actions from "../../store/actions/property-actions";
import { connect } from "react-redux";
import { MapState } from "../../store/interfaces/mapState";
import { Property } from "../../store/reducers/car-reducers";
import { Spinner } from "../common/Spinner/Spinner";
import styles from "./properties.module.scss";
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import { useHistory } from "react-router-dom";

interface Props {
  properties: Property[] | null;
  error: string;
  orderBy: string;
  isDesc: boolean;
  getProperties: () => void;
  sortProperties: (key: string) => void;
}

const Properties: React.FC<Props> = props => {
  const {
    properties,
    error,
    orderBy,
    isDesc,
    getProperties,
    sortProperties
  } = props;

  useEffect(() => getProperties(), []);

  let history = useHistory();

  if (error) {
    return <div>{error}</div>;
  }
  console.log("properties", properties);
  if (properties) {
    return (
      <>
        <div className={`${styles.topMenu} ${styles.right}`}>
          <DefaultButton
            className={"warning"}
            disabled={false}
            onClick={() => history.push("/property/add")}
            text={"Добавить свойство"}
          />
        </div>
        <Table
          values={properties}
          keys={[
            { key: "nameProperty", name: "Перечень свойств" },
            { key: "typeProperty", name: "Тип" }
          ]}
          onClick={(key: string) => sortProperties(key)}
          hasControl
          orderBy={orderBy}
          isDesc={isDesc}
          hasLink={false}
          idNameInValues={"idProperty"}
        />
      </>
    );
  }
  return <Spinner />;
};

const mapStateToProps = ({ properties }: MapState) => {
  return {
    properties: properties.properties,
    error: properties.error,
    orderBy: properties.orderBy,
    isDesc: properties.isDesc
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProperties: () => {
      dispatch(actions.getProperty());
    },
    sortProperties: (key: string) => {
      dispatch(actions.sortProperties(key));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
