import React from "react";
import styles from "./table.module.scss";

interface Key {
  key: string;
  name: string;
}
interface Props {
  keys: Key[];
  onClick: (key: string) => void;
  hasControl: boolean;
}
export const TableHeader: React.FC<Props> = props => {
  const { keys, onClick, hasControl } = props;
  let header: JSX.Element[] = keys.map((header: Key) => {
    return (
      <th key={header.key}>
        <span onClick={() => onClick(header.key)}>{header.name}</span>
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
