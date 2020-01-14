import React from "react";
import styles from "./DefaultButton.module.scss";

interface Props {
  className: string;
  disabled: boolean;
  onClick?: () => void;
  text: string;
}

// TODO: прописать интерфейс пропсов
const DefaultButton: React.FC<Props> = props => {
  const { className, disabled, onClick, text } = props;

  const getClassName = (): string => {
    let clazzName = styles.button;
    if (className) {
      clazzName += ` ${styles[className]}`;
    }
    return clazzName;
  };

  return (
    <button
      className={getClassName()}
      disabled={disabled}
      type="submit"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
