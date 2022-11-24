import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/apiCall";

const settings = ["Profile", "Logout"];

const Header = () => {
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <AppBar sx={{ position: "sticky", backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Button variant="string" to="/" component={RouterLink}>
            <AdbIcon
              sx={{
                display: {
                  xs: "none",

                  lg: "flex",
                },
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DASHBOARD
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                <Typography pl="8px" color="white">
                  {userInfo?.username}
                </Typography>
              </IconButton>
            </Tooltip>
            {userInfo && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Logout" ? (
                      <button
                        onClick={() => {
                          logout(dispatch);
                          navigate("/");
                        }}
                      >
                        {setting}
                      </button>
                    ) : (
                      <Link
                        to={`/profile`}
                        textAlign="center"
                        style={{ color: "black" }}
                      >
                        {setting}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
