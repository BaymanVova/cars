import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";

interface Props {
  path: string;
  children: JSX.Element | JSX.Element[] | string;
}

export const NavItem: React.FC<Props> = props => {
  const { path, children } = props;
  return (
    <NavLink
      to={path}
      className={styles.navItem}
      activeClassName={styles.active}
    >
      {children}
    </NavLink>
  );
};
