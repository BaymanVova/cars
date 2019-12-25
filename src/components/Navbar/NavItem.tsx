import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";

export const NavItem = (props: any) => {
  return (
    <NavLink
      exact
      to={props.path}
      className={styles.navItem}
      activeClassName={styles.active}
    >
      {props.children}
    </NavLink>
  );
};
