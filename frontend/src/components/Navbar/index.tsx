import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// import { Container } from './styles';

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6">NavBar</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
