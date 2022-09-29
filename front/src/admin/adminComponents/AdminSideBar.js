import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const AdminSideBar = ({ openMenu, toggle }) => {
  const handleMenu = () => {
    toggle();
  };
  return (
    <Box
      sx={{
        width: `${openMenu ? "20vw" : "5vw"}`,
        boxSizing: "border-box",
        borderRight: "1px solid rgba(0,0,0,0.2)",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleMenu}>
          {openMenu ? "X" : <MenuIcon />}
        </IconButton>
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
              mr: 3,
              justifyContent: "center",
            }}
          >
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: openMenu ? 1 : 0 }} />
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
              mr: 3,
              justifyContent: "center",
            }}
          >
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="User" sx={{ opacity: openMenu ? 1 : 0 }} />
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
              mr: 3,
              justifyContent: "center",
            }}
          >
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Products" sx={{ opacity: openMenu ? 1 : 0 }} />
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
              mr: 3,
              justifyContent: "center",
            }}
          >
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" sx={{ opacity: openMenu ? 1 : 0 }} />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
};

export default AdminSideBar;
