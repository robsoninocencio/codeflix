import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) => {
  return {
    submit: {
      margin: theme.spacing(1),
    },
  };
});

export const Form = () => {
  const classes = useStyles();

  const buttonProps: ButtonProps = {
    variant: "outlined",
    className: classes.submit,
  };

  const { register, getValues } = useForm();

  return (
    <form>
      <TextField
        name="name"
        label="Nome"
        fullWidth
        variant="outlined"
        inputRef={register}
      />
      <TextField
        name="description"
        label="Descrição"
        multiline
        rows="4"
        fullWidth
        variant="outlined"
        margin="normal"
        inputRef={register}
      />
      <Checkbox name="is_active" inputRef={register} />
      Ativo?
      <Box dir="rtl">
        <Button {...buttonProps} onClick={() => console.log(getValues())}>
          Salvar
        </Button>
        <Button {...buttonProps} type="submit">
          Salvar e continuar editando
        </Button>
      </Box>
    </form>
  );
};
