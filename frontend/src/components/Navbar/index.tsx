import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";
import logo from "../../static/img/logo.png";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: "#000000",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  logo: {
    width: 100,
    [theme.breakpoints.up("sm")]: { width: 170 },
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          aria-controls="menu-appbar"
          aria-haspopup="true"
        >
          <MenuIcon />
        </IconButton>
        <Menu id="menu-appbar" open={false}>
          <MenuItem>Categorias</MenuItem>
        </Menu>
        <Typography className={classes.title}>
          <img src={logo} alt="CodeFlix" className={classes.logo} />
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
