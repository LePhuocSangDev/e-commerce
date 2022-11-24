import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const AdminSideBar = ({ openMenu, toggle }) => {
  const handleMenu = () => {
    toggle();
  };
  return (
    <Box
      sx={{
        width: `${openMenu ? "20vw" : "5vw"}`,
        minWidth: "45px",
        boxSizing: "border-box",
        borderRight: "1px solid rgba(0,0,0,0.2)",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
      }}
    >
      <Box
        sx={{
          height: "64px",
          display: "flex",
          justifyContent: openMenu ? "flex-end" : "center",
          alignItems: "center",
        }}
      >
        {openMenu ? (
          <IconButton onClick={handleMenu}>&#60;</IconButton>
        ) : (
          <IconButton onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List>
        <ListItemButton
          component={RouterLink}
          to="/"
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: openMenu ? 2.5 : 0,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: openMenu ? 3 : 0,
              justifyContent: "center",
            }}
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Trang Chủ"
            sx={{ display: openMenu ? "block" : "none" }}
          />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/admin/users"
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: openMenu ? 2.5 : 0,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: openMenu ? 3 : 0,
              justifyContent: "center",
            }}
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Người Dùng"
            sx={{ display: openMenu ? "block" : "none" }}
          />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/admin/products"
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: openMenu ? 2.5 : 0,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: openMenu ? 3 : 0,
              justifyContent: "center",
            }}
          >
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sản Phẩm"
            sx={{ display: openMenu ? "block" : "none" }}
          />
        </ListItemButton>
        <ListItemButton
          component={RouterLink}
          to="/admin/orders"
          sx={{
            minHeight: 48,
            justifyContent: "center",
            px: openMenu ? 2.5 : 0,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: openMenu ? 3 : 0,
              justifyContent: "center",
            }}
          >
            <ProductionQuantityLimitsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Đơn Đặt Hàng"
            sx={{ display: openMenu ? "block" : "none" }}
          />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
};

export default AdminSideBar;
