import React from "react";
import { HeaderItem } from "./HeaderItem";
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
  const { keys, onClick, hasControl, orderBy, isDesc } = props;
  let header: JSX.Element[] = keys.map((header: Key) => (
    <HeaderItem
      keyValue={header.key}
      name={header.name}
      orderBy={orderBy}
      isDesc={isDesc}
      onClick={onClick}
      key={header.key}
    />
  ));
  return (
    <thead>
      <tr>
        {header}
        {hasControl && <th className={styles.unsortable}>Управление</th>}
      </tr>
    </thead>
  );
};
