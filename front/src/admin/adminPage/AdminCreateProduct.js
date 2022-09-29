import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Container from "@mui/material/Container";
import { Link as RouterLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { publicRequest } from "../../axios";
import { useDispatch } from "react-redux";
import { createProduct } from "../../features/apiCall";

const AdminCreateProduct = ({ type }) => {
  const dispatch = useDispatch();
  const [productInfo, setProductInfo] = useState({
    img: "",
    title: "",
    categories: [],
    size: [],
    price: 0,
    color: [],
    desc: "",
    instock: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setProductInfo((prevState) => ({
          ...prevState,
          img: Reader.result,
        }));
      }
    };
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        "Create Product"
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

            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {productInfo.img && (
              <img
                src={productInfo.img}
                alt=""
                style={{ width: "200px", height: "100px" }}
              />
            )}
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
              label="Enter Title"
              variant="standard"
              value={productInfo.title}
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
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
              Category
            </Typography>
            <TextField
              id="standard-basic"
              label="Enter Category"
              value={productInfo.categories}
              variant="standard"
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  categories: e.target.value.split(","),
                }))
              }
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
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  size: e.target.value.split(","),
                }))
              }
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
              Color
            </Typography>
            <TextField
              value={productInfo.color}
              id="standard-basic"
              label="Enter Color"
              variant="standard"
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  color: e.target.value.split(","),
                }))
              }
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
              label="Number"
              type="number"
              value={productInfo.price}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }))
              }
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
              Description
            </Typography>
            <TextField
              label="Multiline Placeholder"
              placeholder="Enter new Description"
              value={productInfo.description}
              multiline
              onChange={(e) =>
                setProductInfo((prevState) => ({
                  ...prevState,
                  desc: e.target.value,
                }))
              }
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
              size="small"
              variant="contained"
              color="success"
              onClick={() => createProduct(dispatch, productInfo)}
            >
              Create
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/admin/products"
              size="small"
            >
              Back
            </Button>
          </Stack>
        </Container>
      </Paper>
    </Box>
  );
};

export default AdminCreateProduct;
