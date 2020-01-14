import React from "react";

interface Props {
  value: string;
}

export const TableItem: React.FC<Props> = props => {
  return <td>{props.value}</td>;
};
