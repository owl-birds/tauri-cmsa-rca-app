import classes from "./multipleRcaOutput.module.css";
import { useRef, useState } from "react";
// COMPONENTS
import Table from "../table/";
const MultipleRcaOutput = ({ data, countriesList }) => {
  const selectedCountryRef = useRef(countriesList[0]);
  const [countriesData, setCountriesData] = useState(data[countriesList[0]]);
  //   console.log(selectedYearRef);
  console.log(countriesData);
  const selectOnChange = () => {
    setCountriesData(() => data[selectedCountryRef.current.value]);
  };
  return (
    <div className={classes.outputBox}>
      <label htmlFor="select">Output</label>
      <select
        onChange={selectOnChange}
        id="select"
        ref={selectedCountryRef}
        className={classes.selectBox}
        required
      >
        {countriesList.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      {countriesData ? (
        <Table data={countriesData} columns={countriesData.columns} />
      ) : null}
    </div>
  );
};

export default MultipleRcaOutput;
