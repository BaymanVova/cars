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
  value: string[];
  onChange?: (e: any) => void;
}

export const DropDown: React.FC<Props> = props => {
  const {
    id,
    name,
    className,
    classNameLabel = "",
    disabled,
    hasErrors,
    errorText,
    label = "",
    value,
    onChange = () => {}
  } = props;

  return (
    <div className={styles.inputGroupElements}>
      <label htmlFor={id} className={classNames(classNameLabel, styles.label)}>
        {label}
      </label>
      <select
        name={name}
        id={id}
        onChange={onChange}
        className={classNames(styles.input, {
          className: className,
          [styles.error]: hasErrors
        })}
        disabled={disabled}
      >
        {value.map((item: string, index: number) => (
          <option key={`${item}${index}`}>{item}</option>
        ))}
      </select>
      {hasErrors ? <span className={styles.errorText}>{errorText}</span> : null}
    </div>
  );
};
