import React from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import styles from "./table.module.scss";

interface Key {
  key: string;
  name: string;
}
interface Props {
  values: Object[];
  keys: Key[];
  hasControl: boolean;
  orderBy: string;
  isDesc: boolean;
  onClick: (key: string) => void;
}

export const Table: React.FC<Props> = props => {
  const { values, keys, onClick, hasControl, orderBy, isDesc } = props;
  return (
    <table className={styles.table}>
      <TableHeader
        keys={keys}
        onClick={onClick}
        hasControl={hasControl}
        orderBy={orderBy}
        isDesc={isDesc}
      />
      <TableBody
        values={values}
        keys={keys}
        hasControl={hasControl}
        addLink={true}
      />
    </table>
  );
};
