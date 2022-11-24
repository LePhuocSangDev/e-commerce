import { Stack, Typography } from "@mui/material";
import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box } from "@mui/system";

const AdminStatistics = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        p: "16px",
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "10px",
        width: "auto",
      }}
    >
      <Typography variant="h5">Thông số</Typography>
      <Typography variant="p">Tăng trưởng tổng cộng 48.5% 😎</Typography>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <TrendingUpIcon
            sx={{
              background: "purple",
              color: "white",
              height: "50px",
              width: "50px",
              padding: "4px",
              borderRadius: "5px",
            }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", color: "#777777" }}
            >
              Doanh Thu
            </Typography>
            <Typography variant="p">245K</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TrendingUpIcon
            sx={{
              background: "green",
              color: "white",
              height: "50px",
              width: "50px",
              padding: "4px",
              borderRadius: "5px",
            }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", color: "#777777" }}
            >
              Người Dùng
            </Typography>
            <Typography variant="p">245K</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TrendingUpIcon
            sx={{
              background: "orange",
              color: "white",
              height: "50px",
              width: "50px",
              padding: "4px",
              borderRadius: "5px",
            }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", color: "#777777" }}
            >
              Sản phẩm
            </Typography>
            <Typography variant="p">245K</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TrendingUpIcon
            sx={{
              background: "skyblue",
              color: "white",
              height: "50px",
              width: "50px",
              padding: "4px",
              borderRadius: "5px",
            }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "16px", color: "#777777" }}
            >
              Tăng Trưởng Tháng
            </Typography>
            <Typography variant="p">245K</Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AdminStatistics;
