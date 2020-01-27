import React, { useEffect, useState } from "react";
import { Table } from "../common/Table/Table";
import * as actions from "../../store/actions/property-actions";
import { connect } from "react-redux";
import { MapState } from "../../store/interfaces/mapState";
import { Property } from "../../store/reducers/car-reducers";
import { Spinner } from "../common/Spinner/Spinner";
import styles from "./properties.module.scss";
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import { useHistory } from "react-router-dom";
import { LoadState } from "../../assets/utils/loadState";
var classNames = require("classnames");
interface Props {
  properties: Property[] | null;
  error: string;
  orderBy: string;
  isDesc: boolean;
  loadState: LoadState;
  getProperties: () => void;
  sortProperties: (key: string) => void;
  deleteProperty: (id: string) => Promise<void>;
}

const Properties: React.FC<Props> = props => {
  const {
    properties,
    error,
    orderBy,
    isDesc,
    getProperties,
    sortProperties,
    deleteProperty,
    loadState
  } = props;

  useEffect(() => {
    getProperties();
  }, []);

  const [, SetPageState] = useState(loadState);
  const [needNotification, setNotification] = useState(false);

  console.log("render", loadState, needNotification, props);

  useEffect(() => {
    SetPageState(loadState);
    setNotification(true);
  }, [loadState]);

  if (needNotification) {
    switch (loadState) {
      case LoadState.deleted:
        alert("Свойство успешно удалено");
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

  let history = useHistory();

  const delProperty = (id: string) => {
    deleteProperty(id).then(() => getProperties());
  };

  if (error) {
    return <div>{error}</div>;
  }
  if (loadState === LoadState.loading) {
    return <Spinner />;
  }
  console.log("properties", properties);
  if (properties) {
    return (
      <>
        <div className={classNames(styles.topMenu, styles.right)}>
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
          deleteFunc={delProperty}
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
    isDesc: properties.isDesc,
    loadState: properties.loadState
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getProperties: () => {
      dispatch(actions.getProperty());
    },
    sortProperties: (key: string) => dispatch(actions.sortProperties(key)),
    deleteProperty: (id: string) => dispatch(actions.deleteProperty(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
