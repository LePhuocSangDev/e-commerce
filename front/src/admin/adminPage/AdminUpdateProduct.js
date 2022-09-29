import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { Link as RouterLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../axios";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../features/apiCall";

const AdminUpdateProduct = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const [status, setStatus] = useState(false);
  const [input, setInput] = useState({});
  const [infoArray, setInfoArray] = useState({});
  const productInfo = { ...input, ...infoArray, img, status };
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  useEffect(() => {
    const fetchData = async () => {
      const res = await publicRequest.get(`/products/find/${id}`);
      setProduct(res.data);
    };
    fetchData();
  }, [id]);

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleInfoArray = (e) => {
    setInfoArray((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.split(","),
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImg(Reader.result);
      }
    };
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        "Edit Product"
      </Typography>

      <Paper sx={{ width: "100%", py: "16px" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: "blocks", width: "16.66667%" }}
            >
              Image
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ padding: 0, borderRadius: "10px" }}
            >
              <img
                src={img || product.img?.url}
                alt=""
                style={{
                  height: "100px",
                  width: "200px",

                  borderRadius: "10px",
                }}
              />
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: "blocks", width: "16.66667%" }}
            >
              Title
            </Typography>
            <TextField
              id="standard-basic"
              placeholder={product.title}
              label="Enter new title"
              onChange={handleInput}
              name="title"
              variant="standard"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: "blocks", width: "16.66667%" }}
            >
              Categories
            </Typography>
            <TextField
              id="standard-basic"
              label="Enter Category"
              value={productInfo.categories}
              variant="standard"
              name="categories"
              onChange={handleInfoArray}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: "blocks", width: "16.66667%" }}
            >
              Size
            </Typography>
            <TextField
              id="standard-basic"
              value={productInfo.size}
              label="Enter Size"
              variant="standard"
              name="size"
              onChange={handleInfoArray}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: "blocks", width: "16.66667%" }}
            >
              Price
            </Typography>
            <TextField
              id="filled-number"
              placeholder={product.price}
              label="Enter new price"
              type="number"
              onChange={handleInput}
              name="price"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: "blocks", width: "16.66667%" }}
            >
              Status
            </Typography>
            <Select
              label="Aegasd"
              value={product?.instock}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ width: "200px" }}
            >
              <MenuItem value={true}>In Stock</MenuItem>
              <MenuItem value={false}>Sold out</MenuItem>
            </Select>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: "blocks", width: "16.66667%" }}
            >
              Description
            </Typography>
            <TextField
              label="Enter new Description"
              placeholder={product.desc}
              name="desc"
              onChange={handleInput}
              multiline
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => updateProduct(dispatch, id, productInfo)}
              size="small"
              variant="contained"
              color="success"
            >
              Save
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/admin/products"
              size="small"
            >
              Back
            </Button>
            <Button size="small" variant="contained" color="error">
              Delete
            </Button>
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
};

export default AdminUpdateProduct;
