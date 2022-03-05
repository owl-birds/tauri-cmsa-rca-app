export const uniqueRow = (data, colName) => {
  const temp = [];
  // const isColumnExist = data.columns.some((column) => column === colName);
  // if (!isColumnExist) return -1;
  for (let row of data) {
    const isExist = temp.some(
      (item) => item === row[colName].trim().toLowerCase()
    );
    if (!isExist) temp.push(row[colName].trim().toLowerCase());
  }
  return temp;
};
export const round = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};
export const uniqueYear = (data) => {
  return Object.keys(data[0]).filter(
    (col) => col !== "country" && col !== "commodity" && col !== "region"
  );
};
export const editCell = (
  data = [],
  editedValue,
  index = Number,
  columnName
) => {
  const temp = data.map((row) => {
    return { ...row };
  });
  temp.columns = data.columns;
  if (!isNaN(+columnName)) temp[index][columnName] = +editedValue;
  else temp[index][columnName] = editedValue;
  return temp;
};
export const readCsv = async (fileObj) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    console.log(event.target.result);
    return event.target.result;
  };
  reader.readAsText(fileObj);
};
export const addRow = (data, index) => {
  const newRow = {};
  const temp = data.map((row) => {
    return { ...row };
  });
  temp.columns = data.columns;
  if (temp.columns)
    for (let col of temp.columns) {
      newRow[col["Header"]] = "-";
    }
  for (let i = 0; i < temp.length; i += 1) {
    if (i === index) {
      if (i !== temp.length - 1) temp.splice(index, 0, newRow);
      else temp.push(newRow);
    }
  }
  return temp;
};
export const addYearColumn = (data, newYear) => {
  const temp = data.map((row) => {
    const tempRow = { ...row };
    tempRow[newYear] = "-";
    return tempRow;
  });
  temp.columns = [...data.columns];
  const objYear = { Header: newYear, accessor: newYear };
  temp.columns.push(objYear);
  return temp;
};
