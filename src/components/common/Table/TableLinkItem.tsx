import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  value: string;
  link: string;
}

export const TableLinkItem: React.FC<Props> = props => {
  let location = useLocation();
  return (
    <td>
      <NavLink exact to={location.pathname + "/" + props.link}>
        {props.value}
      </NavLink>
    </td>
  );
};
