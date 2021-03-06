import styled from "styled-components";
import { useTable } from "react-table";
// redux
import { useDispatch } from "react-redux";
// cOMPONENTS
import Cell from "../cell/";
// action
import { deleteColYear } from "../../../actions/data";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
    .delete {
      border: 0.5px solid #db2e2e;
      font-size: 1rem;
      margin-left: 4px;
      padding: 0 4px;
      border-radius: 3px;
      color: #db2e2e;
    }
    .delete:hover {
      background-color: #db2e2e;
      color: #fff;
      cursor: pointer;
    }
  }
`;
const Table = ({
  columns,
  data,
  isEditAble = false,
  isWorldData = false,
  isSelfInput = false,
}) => {
  // REDUX STUFFS
  const dispatch = useDispatch();
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  // headerGroups.map((headerGroup) => console.log(headerGroup.headers));
  // console.log(headerGroups[0].headers[0].Header);
  // Render the UI for your table

  // removing a row or a column in the table
  const removeColumn = (columnName) => {
    // removing year col
    // console.log(columnName);
    if (!isSelfInput) dispatch(deleteColYear(data, columnName, isWorldData));
    else dispatch(deleteColYear(data, columnName, isWorldData, isSelfInput));
  };
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}{" "}
                  {isNaN(+column.Header) ? null : (
                    <span
                      onClick={() => removeColumn(column.Header)}
                      className="delete"
                    >
                      X
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {isEditAble ? (
                        <Cell
                          index={row.index}
                          columnName={cell.column.Header}
                          value={cell.value}
                          data={data}
                          isWorldData={isWorldData}
                        />
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};
export default Table;
