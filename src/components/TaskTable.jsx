import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import "../styles/Table.css";
import EditButton from "./EditButton";
import EditTaskStatusSelect from "./EditTaskStatusSelect";
import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import SaveButton2 from "./SaveButton2";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import { Grid } from "@mui/material";
import StyledTableCell from "./StyledTableCell";
import StyledTableRow from "./StyledTableRow";

function TaskTable({ data, updateData, globalFilter, setGlobalFilter }) {
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
        <TextareaAutosize
          className="edit-textarea"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          size="small"
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
          <Grid container direction="row" wrap="nowrap" justifyContent="center">
            <Grid item>
              <EditButton
                setEditableRowIndex={setEditableRowIndex}
                rowIndex={row.row.index}
                editableRowIndex={editableRowIndex}
              ></EditButton>
            </Grid>
            <Grid item>
              <DeleteButton
                tasks={data}
                updateTasks={updateData}
                taskIndex={row.row.index}
              ></DeleteButton>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="row" wrap="nowrap" justifyContent="center">
            <SaveButton2
              setEditableRowIndex={setEditableRowIndex}
              editableRowIndex={editableRowIndex}
              taskIndex={row.row.index}
            ></SaveButton2>{" "}
          </Grid>
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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTableCell key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <Grid container direction="row" alignItems="center">
                          <Grid item>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Grid>
                          <Grid item>
                            {{
                              asc: <Icon>arrow_drop_up</Icon>,
                              desc: <Icon>arrow_drop_down</Icon>,
                            }[header.column.getIsSorted()] ?? null}
                          </Grid>
                        </Grid>
                      </div>
                    )}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <StyledTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="h-4" />
    </div>
  );
}

export default TaskTable;
