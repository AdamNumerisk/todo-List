import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  includesString,
  getFilteredRowModel,
} from "@tanstack/react-table";

import "../styles/Table.css";
import "../styles/ListeTaches.css";
import EditButton2 from "./EditButton2";
import EditTaskStatusSelect from "./EditTaskStatusSelect";
import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import SaveButton2 from "./SaveButton2";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";

function Table({ data, updateData }) {
  const columnHelper = createColumnHelper();
  const [globalFilter, setGlobalFilter] = useState("");
  const [editableRowIndex, setEditableRowIndex] = useState([]);

  function search(row, columnId, value) {
    return row[columnId].includesString(value);
  }

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
    columnHelper.accessor("name", {
      header: `Tâche`,
      footer: (info) => info.column.id,
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableColumnFilters: true,
      enableFilters: true,
    }),
    columnHelper.accessor("status", {
      cell: EditableStatus,
      header: "Statut",
      footer: (info) => info.column.id,

      size: 500,
    }),
    columnHelper.accessor("creationDate", {
      cell: (info) => info.getValue(),
      header: "Date de création",
      footer: (info) => info.column.id,
      size: 100,
    }),
    columnHelper.accessor("modificationDate", {
      cell: (info) => info.getValue(),
      header: "Date de modification",
      footer: (info) => info.column.id,
      size: 100,
    }),
    columnHelper.accessor("actions", {
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
      size: 200,
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    globalFilterFn: includesString,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableGlobalFilter: true,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
  return (
    <div className="p-2">
      <input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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

export default Table;
