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
  hasLink: boolean;
  linkKey?: string;
  linkKeyValue?: string;
  idNameInValues: string;
  onClick: (key: string) => void;
}

export const Table: React.FC<Props> = props => {
  const {
    values,
    keys,
    onClick,
    hasControl = false,
    orderBy,
    isDesc,
    hasLink = false,
    linkKey,
    linkKeyValue,
    idNameInValues
  } = props;
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
        addLink={hasLink}
        linkKey={linkKey}
        linkKeyValue={linkKeyValue}
        idNameInValues={idNameInValues}
      />
    </table>
  );
};
