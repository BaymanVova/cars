import React from "react";
import styles from "./table.module.scss";
var classNames = require("classnames");

interface Props {
  keyValue: string;
  name: string;
  orderBy: string;
  isDesc: boolean;
  onClick: (key: string) => void;
}
export const HeaderItem: React.FC<Props> = props => {
  const { keyValue, name, orderBy, isDesc, onClick } = props;

  let headerText: JSX.Element = <span>{name}</span>;
  if (keyValue === orderBy) {
    headerText = (
      <span
        className={classNames(styles.active, isDesc ? styles.desc : styles.asc)}
      >
        {name}
      </span>
    );
  }

  return <th onClick={() => onClick(keyValue)}>{headerText}</th>;
};
