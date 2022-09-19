import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import "../styles/Table.css";
import { useState } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon,
  Checkbox,
} from "@mui/material";
import StyledTableCell from "./StyledTableCell";
import StyledTableRow from "./StyledTableRow";
import StatusChip from "./StatusChip";

function TaskTable({
  data,
  updateData,
  globalFilter,
  setGlobalFilter,
  rowSelection,
  setRowSelection,
}) {
  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      header: (table) => (
        <Checkbox
          indeterminate={table.table.getIsSomeRowsSelected()}
          checked={table.table.getIsAllRowsSelected()}
          onChange={table.table.getToggleAllRowsSelectedHandler()}
        ></Checkbox>
      ),
      cell: (row) => (
        <Checkbox
          checked={row.row.getIsSelected()}
          indeterminate={row.row.getIsSomeSelected()}
          onChange={row.row.getToggleSelectedHandler()}
        ></Checkbox>
      ),
      accessorKey: "select",
      footer: (info) => info.column.id,
      enableSorting: false,
    },
    {
      header: `Tâche`,
      accessorKey: "name",
      cell: (taskName) => taskName?.getValue(),
      footer: (info) => info.column.id,
      accessorFn: (obj) => obj.name,
    },
    {
      cell: (taskStatus) => (
        <div>
          <StatusChip taskStatus={taskStatus?.getValue()}></StatusChip>
        </div>
      ),
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
      cell: (row) => (
        <Grid container direction="row" wrap="nowrap" justifyContent="center">
          <Grid item>
            <EditButton
              tasks={data}
              updateTasks={updateData}
              taskIndex={row.row.index}
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
      ),
      header: "Actions",
      footer: (info) => info.column.id,
      disableSortBy: true,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
      sorting,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                          {console.log(sorting)}
                          <Grid item>
                            {{
                              asc: <Icon sx={{ mb: -1 }}>arrow_drop_up</Icon>,
                              desc: (
                                <Icon sx={{ mb: -1 }}>arrow_drop_down</Icon>
                              ),
                            }[header.column.getIsSorted()] ??
                              (header.column.getCanSort() &&
                              sorting.length === 0 ? (
                                <Grid container direction="column">
                                  {console.log(sorting)}
                                  <Grid item>
                                    <Icon sx={{ mb: -2 }}>arrow_drop_up</Icon>
                                  </Grid>
                                  <Grid item>
                                    <Icon sx={{ mt: -1 }}>arrow_drop_down</Icon>
                                  </Grid>
                                </Grid>
                              ) : null)}
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
