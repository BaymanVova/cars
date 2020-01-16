import React from "react";
import { TableItem } from "./TableItem";
import { TableLinkItem } from "./TableLinkItem";

interface Key {
  key: string;
  name: string;
}
interface Props {
  values: Object[];
  keys: Key[];
  hasControl: boolean;
  addLink: boolean;
}
export const TableBody: React.FC<Props> = props => {
  const { values, keys, hasControl } = props;
  return (
    <tbody>
      {values.map((currentValue: any) => {
        return (
          <tr key={currentValue.id}>
            {keys.map((value: Key) => {
              // TODO: переделать проверку
              if (value.key === "name") {
                return (
                  <TableLinkItem
                    value={currentValue[value.key]}
                    key={value.key}
                    link={"car/" + currentValue["id"]}
                  />
                );
              }
              return (
                <TableItem value={currentValue[value.key]} key={value.key} />
              );
            })}
            {hasControl && (
              <td>
                <a href={"#"}>Ред.</a>
                <a href={"#"}>Удалить</a>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};
