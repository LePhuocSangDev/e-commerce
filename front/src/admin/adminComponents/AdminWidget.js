import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Widget({ title, num, change }) {
  return (
    <Card sx={{ minWidth: 200, flex: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" my={2}>
          {title === "Số Lượng Người Dùng" ? num : `${num}đ`}
        </Typography>
        <Typography variant="body2">{`Tăng ${change} so với tháng vừa rồi.`}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
}
