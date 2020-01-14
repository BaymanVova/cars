import React from "react";
import { TableItem } from "./TableItem";

interface Key {
  key: string;
  name: string;
}
interface Props {
  values: any;
  keys: Key[];
  hasControl: boolean;
}
export const TableBody: React.FC<Props> = props => {
  const { values, keys, hasControl } = props;
  return (
    <tbody>
      {values.map((currentValue: any) => {
        return (
          <tr key={currentValue.id}>
            {keys.map((value: Key) => {
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
          </tr>
        );
      })}
    </tbody>
  );
};
