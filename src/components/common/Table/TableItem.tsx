import React from "react";

interface Props {
  value: string;
  valueHeader: string;
}

export const TableItem: React.FC<Props> = props => {
  return <td data-label={props.valueHeader}>{props.value}</td>;
};
