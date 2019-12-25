import React from "react";
import { NavItem } from "./NavItem";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.navigation}>
      <div>
        <NavItem path="/">Листинг товаров</NavItem>
        <NavItem path="/property">Листинг проперти</NavItem>
      </div>
      <div>
        <NavItem path="/logout">Выход</NavItem>
      </div>
    </nav>
  );
};
