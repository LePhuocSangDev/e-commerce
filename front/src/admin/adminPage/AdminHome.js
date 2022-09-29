import { Box, Stack } from "@mui/material";
import React from "react";
import AdminChart from "../adminComponents/AdminChart";
import AdminStatistics from "../adminComponents/AdminStatistics";
import AdminWidget from "../adminComponents/AdminWidget";

const AdminHomePage = () => {
  return (
    <Stack spacing={4} sx={{ mt: "16px", background: "#rrr" }}>
      <AdminStatistics />
      <Box sx={{ display: "flex", gap: "16px" }}>
        <AdminWidget />
        <AdminWidget />
        <AdminWidget />
      </Box>
      <AdminChart />
    </Stack>
  );
};

export default AdminHomePage;
