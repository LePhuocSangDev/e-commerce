import { Stack } from "@mui/material";
import React from "react";
import AdminChart from "../adminComponents/AdminChart";
import AdminStatistics from "../adminComponents/AdminStatistics";
import AdminWidget from "../adminComponents/AdminWidget";

const AdminHomePage = () => {
  return (
    <Stack spacing={4} sx={{ mt: "16px", background: "#rrr" }}>
      <AdminStatistics />
      <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
        <AdminWidget title="Tổng Doanh Thu" num="420000000" change="50%" />
        <AdminWidget title="Số Lượng Người Dùng" num="130000" change="20%" />
        <AdminWidget
          title="Tổng Thu Nhập Tháng "
          num="120000000"
          change="40%"
        />
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        <AdminChart title="Người Dùng Mới" />
        <AdminChart title="Thu Nhập" type="bar" />
      </Stack>
    </Stack>
  );
};

export default AdminHomePage;
