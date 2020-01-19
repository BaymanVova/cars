import React from "react";
import styles from "./properties.module.scss";
import DefaultButton from "../UI/DefaultButton/DefaultButton";

export const AddProperty = () => {
  return (
    <>
      <div className={`${styles.topMenu} ${styles.right}`}>
        <DefaultButton
          className={"error"}
          disabled={false}
          onClick={() => {}}
          text={"Вернуться"}
        />
        <DefaultButton
          className={"success"}
          disabled={false}
          onClick={() => {}}
          text={"Сохранить"}
        />
      </div>
      <h4>Добавление свойста</h4>
    </>
  );
};
