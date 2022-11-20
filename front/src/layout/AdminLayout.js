import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../admin/adminComponents/AdminSideBar";
import AdminHeader from "../admin/adminComponents/AdminHeader";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import { useToggle } from "../hooks/useToggle";

const AdminLayout = () => {
  const [openMenu, toggle] = useToggle(false);
  return (
    <Box className="admin" sx={{ display: "flex" }}>
      <AdminSideBar openMenu={openMenu} toggle={toggle} />
      <Stack maxWidth="xl" sx={{ width: `${openMenu ? "80vw" : "95vw"}` }}>
        <AdminHeader />
        <Container maxWidth="xl" sx={{ paddingTop: "16px" }}>
          <Outlet />
        </Container>
      </Stack>
    </Box>
  );
};

export default AdminLayout;
