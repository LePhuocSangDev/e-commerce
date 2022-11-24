import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deleteUser, getUsers } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectOrder } from "../../features/orderSlice";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "image", label: "USERNAME", minWidth: 100 },
  { id: "title", label: "EMAIL", minWidth: 100 },

  {
    id: "action",
    label: "ACTIONS",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector(selectUser);
  const [page, setPage] = useState(0);
  const { orders } = useSelector(selectOrder);
  console.log(orders);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteUser(dispatch, id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User - Management
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon
              sx={{
                color: "black",
                mr: "4px",
              }}
            ></SearchIcon>

            <TextField id="input-with-sx" label="Search" variant="standard" />
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ ml: "4px" }}
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
