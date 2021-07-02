import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import MuiMenu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

const Menu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>

      <MuiMenu
        id="menu-appbar"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>Categorias</MenuItem>
        <MenuItem onClick={handleClose}>Gêneros</MenuItem>
      </MuiMenu>
    </>
  );
};

export default Menu;
