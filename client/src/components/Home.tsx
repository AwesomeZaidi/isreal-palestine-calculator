import { Box, Button, Collapse, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ControlledAccordions from "./ControlledAccordions";

const Home = () => {
  return (
    <Box m="3em auto" textAlign={"center"} width={"100vw"}>
      <Typography
        gutterBottom
        variant="h4"
        textAlign={"center"}
        className="title"
      >
        Financial boycotting
      </Typography>

      <Typography mx={2} variant="body1" textAlign={"center"} mb={4}>
        Find out how much you’ve been spending towards the following:
      </Typography>
      <Link to={`israel`}>
        <Button className="primary_btn">Israel</Button>
      </Link>
      <ControlledAccordions></ControlledAccordions>
    </Box>
  );
};

export default Home;
