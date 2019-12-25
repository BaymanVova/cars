import React, { useState } from "react";
import styles from "./input.module.scss";

import { ReactComponent as VisibleIcon } from "./assets/visibility.svg";
import { ReactComponent as HiddenIcon } from "./assets/visibility_off.svg";

interface Props {
  name: string;
  className?: string;
  disabled?: boolean;
  hasErrors: boolean;
  errorText?: string;
  label: string;
  placeHolder?: string;
  type: string;
  value: string;
  onChange: (e: any) => void;
}

export const Input: React.FC<Props> = props => {
  const {
    name,
    className,
    disabled,
    hasErrors,
    errorText,
    placeHolder = "",
    label = "",
    type = "text",
    value = "",
    onChange,
    ...rest
  } = props;

  const [currentType, setType] = useState(type);

  // // TODO: тип события?
  // const onChangeHandler = (e: any): void => {
  //   setError(false);
  //   onChange(e);
  // };

  const showHide = (e: any): void => {
    const nextType = currentType === "password" ? "text" : "password";
    setType(nextType);
  };

  const getClassName = (): string => {
    let clazzName = styles.input;
    if (hasErrors) {
      clazzName += ` ${styles.error}`;
    }
    return clazzName;
  };

  const input = () => (
    <div className={styles.inputBox}>
      <input
        id={name}
        className={getClassName()}
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
  );

  console.log("render");
  return (
    <div className={styles.inputGroupElements}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {input()}
      {hasErrors ? <span className={styles.errorText}>{errorText}</span> : null}
    </div>
  );
};
