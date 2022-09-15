import TextField from "@mui/material/TextField";

function TableSearchBar({ globalFilter, setGlobalFilter }) {
  return (
    <TextField
      sx={{ my: 2, width: 400 }}
      id="search"
      label="Recherche"
      value={globalFilter ?? ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      size="small"
    ></TextField>
  );
}

export default TableSearchBar;
