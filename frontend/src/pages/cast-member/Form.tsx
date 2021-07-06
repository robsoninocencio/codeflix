import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button, { ButtonProps } from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import castMemberHttp from "../../util/http/cast-member-http";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useEffect } from "react";

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
    className: classes.submit,
    variant: "outlined",
  };

  const { register, handleSubmit, getValues, setValue } = useForm();

  useEffect(() => {
    register({ name: "type" });
  }, [register]);

  function onSubmit(formData, event) {
    console.log("event = ", event);
    castMemberHttp.create(formData).then((response) => console.log(response));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        label="Nome"
        fullWidth
        variant="outlined"
        inputRef={register}
      />
      <FormControl component="fieldset" margin={"normal"}>
        <FormLabel component="legend">Tipo</FormLabel>
        <RadioGroup
          aria-label="tipo"
          name="type"
          onChange={(e) => {
            setValue("type", parseInt(e.target.value));
          }}
        >
          <FormControlLabel value="1" control={<Radio />} label="Diretor" />
          <FormControlLabel value="2" control={<Radio />} label="Ator" />
        </RadioGroup>
      </FormControl>
      <Box dir="rtl">
        <Button {...buttonProps} onClick={() => onSubmit(getValues(), null)}>
          Salvar
        </Button>
        <Button {...buttonProps} type="submit">
          Salvar e continuar editando
        </Button>
      </Box>
    </form>
  );
};
