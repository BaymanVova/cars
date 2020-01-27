import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  value: string;
  link: string;
  valueHeader: string;
}

export const TableLinkItem: React.FC<Props> = props => {
  let location = useLocation();
  return (
    <td data-label={props.valueHeader}>
      <NavLink exact to={location.pathname + "/" + props.link}>
        {props.value}
      </NavLink>
    </td>
  );
};
