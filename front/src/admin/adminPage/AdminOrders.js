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
import { deleteOrder, getOrders } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../features/orderSlice";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "code", label: "CODE", minWidth: 100 },
  {
    id: "status",
    label: "STATUS",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "NAME",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "ACTION",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function Products() {
  const dispatch = useDispatch();
  const { orders, orderInfo } = useSelector(selectOrder);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    deleteOrder(dispatch, id);
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
        Đơn đặt hàng
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "16px",
            width: "100%",
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
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{order.orderCode}</TableCell>
                    <TableCell align="center">{order.status}</TableCell>
                    <TableCell align="center">{order.userInfo.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ ml: "4px" }}
                        onClick={() => handleDelete(order._id)}
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
