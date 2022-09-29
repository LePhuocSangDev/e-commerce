import { Button } from "@mui/material";
import React from "react";
import notFound from "../../asset/img/notfound.png";
import { Link as RouterLink } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <img src={notFound} alt="" />
        <h4>404-Page not found</h4>
        <p>
          The page you are looking for might have been removed had its name
          changed or temporarily unavailable
        </p>
        <Button to="/" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
