import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  YAxis,
  Bar,
} from "recharts";
import { IncomeData, UserData } from "../../data";

export default function Chart({ title, type }) {
  return (
    <Box height={"40vh"} width={{ xs: "100%", md: "50%" }}>
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>{title}</h3>
      <ResponsiveContainer width="98%">
        {type ? (
          <BarChart data={IncomeData}>
            <XAxis dataKey="year" stroke="#8884d8" />
            <YAxis dataKey="income" />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="income" fill="#8884d8" barSize={30} />
          </BarChart>
        ) : (
          <LineChart data={UserData}>
            <XAxis dataKey="year" stroke="#5550bd" />
            <Line type="monotone" dataKey="userGain" stroke="#82ca9d" />
            <Line type="monotone" dataKey="userLost" stroke="#FF0000" />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
}
