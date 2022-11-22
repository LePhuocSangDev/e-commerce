import react, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deleteProduct, getProduct } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../axios";
import { selectProduct } from "../../features/productSlice";
import axios from "axios";

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "products", label: "PRODUCTS", minWidth: 100 },
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
  const { products } = useSelector(selectProduct);
  const [orderInfo, setOrderInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await userRequest.get("/orders");
      setOrderInfo(data);
    };
    fetchOrders();
  }, []);
  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
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
        User's orders
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/admin/product/create"
            size="small"
            color="success"
          >
            Create Product
          </Button>
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
              {orderInfo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => (
                  <TableRow
                    key={product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{product.status}</TableCell>
                    <TableCell align="center">{product.status}</TableCell>
                    <TableCell align="center">
                      {product.userInfo.name}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        component={RouterLink}
                        to={`/admin/product/update/${product._id}`}
                        variant="contained"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ ml: "4px" }}
                        onClick={() => handleDelete(product._id)}
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
