import { csvParse, autoType } from "d3";
import { addRow } from "../helpers/utils";
export const textToCsv = (stringData) => csvParse(stringData, autoType);
export const addingRow = (data) => addRow(data, data.length - 1);
