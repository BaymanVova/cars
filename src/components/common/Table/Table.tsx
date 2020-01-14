import React from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import styles from "./table.module.scss";

interface Key {
  key: string;
  name: string;
}
interface Props {
  values: any;
  keys: Key[];
  onClick: (key: string) => void;
  hasControl: boolean;
}

export const Table: React.FC<Props> = props => {
  const { values, keys, onClick, hasControl } = props;
  return (
    <table className={styles.table}>
      <TableHeader keys={keys} onClick={onClick} hasControl={hasControl} />
      <TableBody values={values} keys={keys} hasControl={hasControl} />
    </table>
  );
};
