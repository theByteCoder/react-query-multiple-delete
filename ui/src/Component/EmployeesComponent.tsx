import React, { Key, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useQuery } from "react-query";
import useDeleteHook from "../Hooks/useDeleteHook";

const BASE_URI = "http://localhost:8000/employees";

const columns = [
  {
    field: "emp_no",
    headerName: "Employee Number",
    type: "string",
    width: 240,
  },
  { field: "birth_date", headerName: "Birth Date", type: "string", width: 240 },
  { field: "first_name", headerName: "First Name", type: "string", width: 240 },
  { field: "last_name", headerName: "Last Name", type: "string", width: 240 },
  { field: "gender", headerName: "Gender", type: "string", width: 240 },
  { field: "hire_date", headerName: "Hire Date", type: "string", width: 240 },
];

export const EmployeesComponent = () => {
  const [selectedRows, setSelectedRows] = useState<Key[] | string[]>([]);
  const [deleteFn] = useDeleteHook(
    selectedRows,
    `${BASE_URI}/api/delete/emp_no=`,
    "/api/getEmployees/"
  );

  const getEmployees = async () => {
    const response = await fetch(`${BASE_URI}/api/getEmployees/`);
    const { data } = await response.json();
    return data;
  };

  const results = useQuery("/api/getEmployees/", getEmployees);

  useEffect(() => {
    console.log("results.data", results.data);
  }, [results.data]);

  useEffect(() => {
    console.log("selectedRows", selectedRows);
  }, [selectedRows]);

  const setRows = () => {
    const rows: {
      id: string;
      emp_no: string;
      birth_date: string;
      first_name: string;
      last_name: string;
      gender: string;
      hire_date: string;
    }[] = [];
    results.data.forEach(
      (eachRow: {
        emp_no: string;
        birth_date: string;
        first_name: string;
        last_name: string;
        gender: string;
        hire_date: string;
      }) => {
        rows.push({
          id: eachRow.emp_no,
          emp_no: eachRow.emp_no,
          birth_date: eachRow.birth_date,
          first_name: eachRow.first_name,
          last_name: eachRow.last_name,
          gender: eachRow.gender,
          hire_date: eachRow.hire_date,
        });
      }
    );
    return rows;
  };

  const onDelete = async () => {
    deleteFn();
  };

  return results.data !== undefined ? (
    <>
      <button onClick={onDelete} disabled={!selectedRows.length}>
        <DeleteOutlinedIcon />
      </button>
      <div style={{ height: 800, width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={setRows()}
          columns={columns}
          pageSize={100}
          checkboxSelection
          loading={results.data === undefined}
          onSelectionChange={(row) => {
            setSelectedRows(row.rowIds);
          }}
        />
      </div>
    </>
  ) : (
    "Loading..."
  );
};

export default EmployeesComponent;
