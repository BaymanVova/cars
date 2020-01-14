import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultButton from "../UI/DefaultButton/DefaultButton";
import { Table } from "../common/Table/Table";

export const CarCard = () => {
  let temp: any[] = [];
  const [data, setData] = useState();

  useEffect(() => {
    getCars();
  }, []);

  const getCars = () => {
    axios
      .get("https://caronline-f2f9e.firebaseio.com/cars.json")
      .then(response => {
        for (let key in response.data) {
          temp.push(response.data[key]);
        }
        setData(temp);
      });
  };

  const sort = (key: string) => {
    temp = [...data];
    temp.sort((a, b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    });
    setData(temp);
  };

  if (data) {
    return (
      <>
        <DefaultButton
          className={"warning"}
          disabled={false}
          onClick={(): void => {
            alert("Soon");
          }}
          text={"Добавить товар"}
        />
        <Table
          values={data}
          keys={[
            { key: "name", name: "Перечень товаров" },
            { key: "price", name: "Стоимость" },
            { key: "date", name: "Дата изменения" }
          ]}
          onClick={(key: string) => sort(key)}
          hasControl
        />
      </>
    );
  }
  return null;
};
