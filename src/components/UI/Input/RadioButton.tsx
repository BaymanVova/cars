import React from "react";
import styles from "./assets/input.module.scss";

interface RadioButtonGroupProps {
  id?: string;
  error?: string;
  label: string;
  classNameLabel: string;
  value?: string;
  touched?: boolean;
}
export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = props => {
  const { children, error, label, classNameLabel, touched = false } = props;
  return (
    <div>
      <label className={classNameLabel}>{label}</label>
      <div>{children}</div>
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

interface Field {
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
}
interface Props {
  field: Field;
  id: string;
  label: string;
  className?: string;
}
export const RadioButton: React.FC<Props> = props => {
  const { field, id, label, className, ...rest } = props;
  return (
    <div>
      <input
        className={`${styles.radio} ${className}`}
        name={field.name}
        id={id}
        type="radio"
        value={id}
        checked={id === field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
