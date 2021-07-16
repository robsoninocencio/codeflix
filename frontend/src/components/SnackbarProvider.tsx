import * as React from "react";
import {
  SnackbarProvider as NotistackProvider,
  SnackbarProviderProps,
} from "notistack";
import { IconButton, makeStyles, Theme } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// import { cyan } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => {
  return {
    variantSuccess: {
      backgroundColor: theme.palette.success.main,
      // backgroundColor: "#1b5e20",
      // backgroundColor: cyan["500"],
    },
    variantError: {
      backgroundColor: theme.palette.error.main,
    },
    variantInfo: {
      backgroundColor: theme.palette.primary.main,
    },
  };
});

export const SnackbarProvider: React.FC<SnackbarProviderProps> = (props) => {
  let snackbarProviderRef;
  const classes = useStyles();

  const defaultProps: SnackbarProviderProps = {
    ...props,
    classes,
    autoHideDuration: 3000,
    maxSnack: 3,
    anchorOrigin: {
      horizontal: "right",
      vertical: "top",
    },
    preventDuplicate: true,
    ref: (el) => (snackbarProviderRef = el),
    action: (key) => (
      <IconButton
        color={"inherit"}
        style={{ fontSize: 20 }}
        onClick={() => snackbarProviderRef.closeSnackbar(key)}
      >
        <CloseIcon />
      </IconButton>
    ),
  };
  // console.log("props = ", props);
  // console.log("defaultProps = ", defaultProps);

  // const newProps = { ...defaultProps, ...props };

  return (
    <NotistackProvider {...defaultProps}>{props.children}</NotistackProvider>
  );
};
