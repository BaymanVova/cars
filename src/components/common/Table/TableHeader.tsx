import React from "react";
import styles from "./table.module.scss";

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
  const getClassName = (isDesc: boolean): string => {
    let clazzName = styles.active;
    clazzName += isDesc ? ` ${styles.desc}` : ` ${styles.asc}`;
    return clazzName;
  };

  const { keys, onClick, hasControl, orderBy, isDesc } = props;
  let header: JSX.Element[] = keys.map((header: Key) => {
    let headerText: JSX.Element = (
      <span onClick={() => onClick(header.key)}>{header.name}</span>
    );
    if (header.key === orderBy) {
      headerText = (
        <span
          onClick={() => onClick(header.key)}
          className={getClassName(isDesc)}
        >
          {header.name}
        </span>
      );
    }
    return <th key={header.key}>{headerText}</th>;
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
