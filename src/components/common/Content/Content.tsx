import React from "react";
import styles from "./content.module.scss";

interface Props {
  children: JSX.Element | JSX.Element[] | null;
}

export const Content: React.FC<Props> = props => {
  return <div className={styles.content}>{props.children}</div>;
};
