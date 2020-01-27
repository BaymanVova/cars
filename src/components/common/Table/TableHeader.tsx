import React from "react";
import styles from "./table.module.scss";
var classNames = require("classnames");
interface Key {
  key: string;
  name: string;
}
interface Props {
  keys: Key[];
  hasControl: boolean;
  orderBy: string;
  isDesc: boolean;
  onClick: (key: string) => void;
}
export const TableHeader: React.FC<Props> = props => {
  const { keys, onClick, hasControl, orderBy, isDesc } = props;
  let header: JSX.Element[] = keys.map((header: Key) => {
    let headerText: JSX.Element = <span>{header.name}</span>;
    if (header.key === orderBy) {
      headerText = (
        <span
          className={classNames(
            styles.active,
            isDesc ? styles.desc : styles.asc
          )}
        >
          {header.name}
        </span>
      );
    }
    return (
      <th onClick={() => onClick(header.key)} key={header.key}>
        {headerText}
      </th>
    );
  });
  return (
    <thead>
      <tr>
        {header}
        {hasControl && <th className={styles.unsortable}>Управление</th>}
      </tr>
    </thead>
  );
};
