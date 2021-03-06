import React, { useState } from "react";
import styles from "./assets/input.module.scss";

import { ReactComponent as VisibleIcon } from "./assets/visibility.svg";
import { ReactComponent as HiddenIcon } from "./assets/visibility_off.svg";

var classNames = require("classnames");

interface Props {
  id: string;
  name?: string;
  className?: string;
  classNameLabel?: string;
  disabled?: boolean;
  hasErrors: boolean;
  errorText?: string;
  label: string;
  placeHolder?: string;
  type: string;
  value: string | string[];
  onChange?: (e: any) => void;
}

export const Input: React.FC<Props> = props => {
  const {
    id,
    name,
    className,
    classNameLabel = "",
    disabled,
    hasErrors,
    errorText,
    placeHolder = "",
    label = "",
    type = "text",
    value,
    onChange = () => {},
    ...rest
  } = props;

  const [currentType, setType] = useState(type);

  const showHide = (): void => {
    const nextType = currentType === "password" ? "text" : "password";
    setType(nextType);
  };

  return (
    <div className={styles.inputGroupElements}>
      <label htmlFor={id} className={classNames(classNameLabel, styles.label)}>
        {label}
      </label>
      <div className={styles.inputBox}>
        <input
          id={id}
          name={name}
          className={classNames(styles.input, {
            className: className,
            [styles.error]: hasErrors
          })}
          onChange={onChange}
          type={currentType}
          disabled={disabled}
          value={value}
          placeholder={placeHolder}
          {...rest}
        />
        {type === "password" && (
          <div className={styles.visibility} onClick={showHide} role="button">
            {currentType === "password" ? <VisibleIcon /> : <HiddenIcon />}
          </div>
        )}
      </div>
      {hasErrors ? <span className={styles.errorText}>{errorText}</span> : null}
    </div>
  );
};
