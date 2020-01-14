import React from "react";
import axios from "axios";
import DefaultButton from "../UI/DefaultButton/DefaultButton";

export const CarCard = () => {
  const getCars = () => {
    axios
      .get("https://caronline-f2f9e.firebaseio.com/cars.json")
      .then(response => console.log(response));
  };
  getCars();
  return (
    <>
      <h1>Внутреняя страница автомобилей</h1>
      <DefaultButton
        className={"warning"}
        disabled={false}
        onClick={(): void => {
          alert("Soon");
        }}
        text={"Добавить товар"}
      />
    </>
  );
};
