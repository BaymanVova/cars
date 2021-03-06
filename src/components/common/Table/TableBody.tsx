import React from "react";
import { TableItem } from "./TableItem";
import { TableLinkItem } from "./TableLinkItem";
import styles from "./table.module.scss";
import { Link, useLocation } from "react-router-dom";

interface Key {
  key: string;
  name: string;
  render?: (text: any) => void;
}
interface Props {
  values: Object[];
  keys: Key[];
  hasControl: boolean;
  addLink: boolean;
  linkKey?: string;
  linkKeyValue?: string;
  idNameInValues: string;
  deleteFunc?: (id: string) => void;
}
export const TableBody: React.FC<Props> = props => {
  let location = useLocation();
  const {
    values,
    keys,
    hasControl,
    addLink,
    linkKey,
    linkKeyValue,
    idNameInValues,
    deleteFunc
  } = props;
  return (
    <tbody>
      {values.map((currentValue: any) => {
        return (
          <tr key={currentValue[idNameInValues]}>
            {keys.map((value: Key) => {
              if (addLink && linkKey && linkKeyValue) {
                if (value.key === linkKey) {
                  return (
                    <TableLinkItem
                      valueHeader={value.name}
                      value={currentValue[value.key]}
                      key={value.key}
                      link={currentValue[linkKeyValue]}
                    />
                  );
                }
              }
              return (
                <TableItem
                  valueHeader={value.name}
                  value={
                    value.render
                      ? value.render(currentValue[value.key])
                      : currentValue[value.key]
                  }
                  key={value.key}
                />
              );
            })}
            {hasControl && (
              <td data-label={"Управление"}>
                <Link
                  to={`${location.pathname}/edit/${
                    currentValue[idNameInValues!]
                  }`}
                  className={styles.control}
                >
                  Ред.
                </Link>
                <a
                  href={"/delete"}
                  className={styles.control}
                  onClick={e => {
                    e.preventDefault();
                    if (deleteFunc) {
                      deleteFunc(currentValue[idNameInValues!]);
                    }
                  }}
                >
                  Удалить
                </a>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};
