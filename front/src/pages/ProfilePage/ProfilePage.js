import React from "react";
import "./ProfilePage.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ProfilePage = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  ];
  return (
    <div className="profile">
      <h4>Account Settings</h4>
      <div className="profile-container">
        <div className="profile-nav">
          <button>Orders</button>
          <button>Account settings</button>
          <button>Wish list</button>
        </div>

        <form action="" className="update-profile">
          <div>
            <label htmlFor="update-name">
              <p>
                <span>Email</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
            <label htmlFor="update-name">
              <p>
                <span>Username</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
          </div>
          <div>
            <label htmlFor="update-name">
              <p>
                <span>Password</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
            <label htmlFor="update-name">
              <p>
                <span>Email</span>
                <span>Required</span>
              </p>
              <input type="text" id="update-name" />
            </label>
          </div>
          <input type="submit" className="save-btn" value="Save" />
        </form>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProfilePage;
