import React from "react";
import styles from "./assets/input.module.scss";

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
  value: string;
  onChange?: (e: any) => void;
}

export const Area: React.FC<Props> = props => {
  const {
    id,
    name,
    className,
    classNameLabel = "",
    disabled,
    hasErrors,
    errorText,
    label = "",
    placeHolder,
    value,
    onChange = () => {}
  } = props;

  return (
    <div className={styles.inputGroupElements}>
      <label htmlFor={id} className={classNames(classNameLabel, styles.label)}>
        {label}
      </label>
      <div className={styles.inputBox}>
        <textarea
          name={name}
          id={id}
          placeholder={placeHolder}
          onChange={onChange}
          className={classNames(styles.textarea, styles.input, {
            className: className,
            [styles.error]: hasErrors
          })}
          disabled={disabled}
          value={value}
        />
      </div>
      {hasErrors ? <span className={styles.errorText}>{errorText}</span> : null}
    </div>
  );
};
