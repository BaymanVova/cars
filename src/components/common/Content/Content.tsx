import React from "react";
import styles from "./content.module.scss";

export const Content: React.FC = props => {
  return <div className={styles.content}>{props.children}</div>;
};
