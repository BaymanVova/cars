export const sortTableDesc = (key: string, values: any[]): any[] => {
  const tempData = [...values];
  tempData.sort((a, b) => {
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  });
  return tempData;
};

export const sortTableAsx = (key: string, values: any[]): any[] => {
  const tempData = [...values];
  tempData.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
  return tempData;
};
