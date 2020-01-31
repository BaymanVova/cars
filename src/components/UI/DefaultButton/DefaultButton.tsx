import React from "react";
import styles from "./DefaultButton.module.scss";
var classNames = require("classnames");
interface Props {
  className: string;
  disabled?: boolean;
  onClick?: () => void;
  text: string;
}
export const DefaultButton: React.FC<Props> = props => {
  const { className, disabled = false, onClick, text } = props;

  return (
    <button
      className={classNames(styles.button, { [styles[className]]: className })}
      disabled={disabled}
      type="submit"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
