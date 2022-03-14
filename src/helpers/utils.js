export const uniqueRow = (data, colName, excludedCol = "") => {
  const temp = [];
  // const isColumnExist = data.columns.some((column) => column === colName);
  // if (!isColumnExist) return -1;
  for (let row of data) {
    const isExist = temp.some(
      (item) => item === row[colName].trim().toLowerCase()
    );
    if (!isExist) temp.push(row[colName].trim().toLowerCase());
  }
  if (excludedCol === "") {
    return temp;
  } else {
    return temp.filter((element) => element !== excludedCol);
  }
};
export const round = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};
export const uniqueYear = (data) => {
  const temp = Object.keys(data[0]).filter(
    (col) => col !== "country" && col !== "commodity" && col !== "region"
  );
  const result = temp.map((year) => +year);
  return result;
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

export const makeDataForSelfinput = (columns) => {
  const data = [{}];
  data.columns = [];
  for (let column of columns) {
    data.columns.push({
      Header: column,
      accessor: column,
    });
    data[0][column] = "-";
  }
  return data;
};

export const sortingNumArr = (numArr) => {
  const temp = [...numArr];
  temp.sort((a, b) => a - b);
  return temp;
};

export const deleteCol = (data, colName) => {
  const columnList = Object.keys(data[0]);
  columnList.splice(columnList.indexOf(colName), 1);
  const resultTemp = [];
  for (let row of data) {
    let temp = {};
    for (let col of columnList) {
      // if (col === colName) continue;
      temp[col] = row[col];
    }
    resultTemp.push(temp);
  }
  let tempColumnList = [];
  for (let col of columnList) {
    let tempObj = { Header: col, accessor: col };
    tempColumnList.push(tempObj);
  }
  resultTemp.columns = tempColumnList;
  return resultTemp;
};
