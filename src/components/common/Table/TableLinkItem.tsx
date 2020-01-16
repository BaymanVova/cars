import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  value: string;
  link: string;
}

export const TableLinkItem: React.FC<Props> = props => {
  return (
    <td>
      <NavLink exact to={"/" + props.link}>
        {props.value}
      </NavLink>
    </td>
  );
};
