import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import "../styles/Table.css";
import "../styles/TaskList.css";
import EditButton2 from "./EditButton2";
import EditTaskStatusSelect from "./EditTaskStatusSelect";
import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import SaveButton2 from "./SaveButton2";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TaskTable({ data, updateData }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [editableRowIndex, setEditableRowIndex] = useState([]);

  const EditableCell = ({ getValue, row: { index } }) => {
    const initialValue = getValue();
    const onChange = (e) => {
      setValue(e.target.value);
    };

    const onBlur = () => {
      const isChanged = initialValue !== value;
      if (isChanged) {
        const newData = [...data];
        newData[index].name = value;
        newData[index].modificationDate = `${moment().format("L")}`;
        updateData(newData);
      }
    };

    // Sync valeur si changé à l'extérieur
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const [value, setValue] = useState(initialValue);
    return editableRowIndex.includes(index) ? (
      <div>
        {/*<input value={value} onChange={onChange} onBlur={onBlur}></input>*/}
        <TextareaAutosize
          className="edit-textarea"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        ></TextareaAutosize>
      </div>
    ) : (
      <div>{value}</div>
    );
  };

  const EditableStatus = ({ getValue, row: { index } }) => {
    const initialStatus = getValue();

    // Sync valeur si changé à l'extérieur
    useEffect(() => {
      setStatus(initialStatus);
    }, [initialStatus]);

    const [status, setStatus] = useState(initialStatus);
    return editableRowIndex.includes(index) ? (
      <EditTaskStatusSelect
        newTaskStatus={status}
        setNewTaskStatus={setStatus}
        initialStatus={initialStatus}
        status={status}
        data={data}
        updateData={updateData}
        index={index}
      ></EditTaskStatusSelect>
    ) : (
      <div>{status}</div>
    );
  };

  const defaultColumn = {
    cell: EditableCell,
  };

  const columns = [
    {
      header: "Tâche",
      accessorKey: "name",
      cell: EditableCell,
      footer: (info) => info.column.id,
      accessorFn: (obj) => obj.name,
    },
    {
      cell: EditableStatus,
      header: "Statut",
      accessorKey: "status",
      footer: (info) => info.column.id,
      accessorFn: (obj) => obj.status,
    },
    {
      cell: (creationDate) => creationDate?.getValue(),
      header: "Date de création",
      accessorKey: "creationDate",
      footer: (info) => info.column.id,
      accessorFn: (obj) => obj.creationDate,
    },
    {
      cell: (modifDate) => modifDate?.getValue(),
      header: "Date de modification",
      accessorKey: "modificationDate",
      footer: (info) => info.column.id,
      accessorFn: (obj) => obj.modificationDate,
    },
    {
      cell: (row) =>
        !editableRowIndex.includes(row.row.index) ? (
          <div>
            <EditButton2
              setEditableRowIndex={setEditableRowIndex}
              rowIndex={row.row.index}
              editableRowIndex={editableRowIndex}
            ></EditButton2>
            <DeleteButton
              tasks={data}
              updateTasks={updateData}
              taskIndex={row.row.index}
            ></DeleteButton>
          </div>
        ) : (
          <SaveButton2
            setEditableRowIndex={setEditableRowIndex}
            editableRowIndex={editableRowIndex}
            taskIndex={row.row.index}
          ></SaveButton2>
        ),
      header: "Actions",
      footer: (info) => info.column.id,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="p-2">
      <label htmlFor="search">
        Recherche par tâche :
        <TextField
          id="search"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          variant="standard"
        ></TextField>
      </label>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {" "}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  );
}

export default TaskTable;
