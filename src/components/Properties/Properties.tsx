import React, { useState } from "react";
import { Table } from "../common/Table/Table";

export const Properties = () => {
  const tempProperty: any[] = [
    { id: 1, name: "Цвет", type: "Dropdown" },
    { id: 2, name: "Год выпуска", type: "String" },
    { id: 3, name: "Количество колёс", type: "Number" }
  ];
  const [property, setProperty] = useState([...tempProperty]);

  const sortProperty = (key: string) => {
    console.log(tempProperty);
    tempProperty.sort((a, b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    });
    setProperty(tempProperty);
    console.log(property);
  };
  return (
    <>
      <Table
        values={property}
        keys={[
          { key: "name", name: "Перечень свойств" },
          { key: "type", name: "Тип" }
        ]}
        onClick={(key: string) => sortProperty(key)}
        hasControl
        orderBy={"name"}
        isDesc={true}
      />
    </>
  );
};
