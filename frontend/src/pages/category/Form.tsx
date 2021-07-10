import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import categoryHttp from "../../util/http/category-http";
import * as yup from "../../util/vendor/yup";

interface ICategory {
  name: string;
  description: string;
  is_active: boolean;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    submit: {
      margin: theme.spacing(1),
    },
  };
});

const validationSchema = yup.object().shape({
  name: yup.string().label("Nome").required().max(255),
});

export const Form = () => {
  const classes = useStyles();

  const buttonProps: ButtonProps = {
    className: classes.submit,
    color: "secondary",
    variant: "contained",
  };

  const { register, handleSubmit, getValues, errors } = useForm<ICategory>({
    validationSchema,
    defaultValues: {
      is_active: true,
    },
  });
  console.log("errors = ", errors);

  const onSubmit = (formData: ICategory, event: any) => {
    console.log("event = ", event);
    console.log("data = ", formData);
    categoryHttp.create(formData).then((response) => console.log(response));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        label="Nome"
        fullWidth
        variant="outlined"
        inputRef={register}
        error={errors.name !== undefined}
        helperText={errors.name && errors.name.message}
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
      <Checkbox
        name="is_active"
        color="primary"
        inputRef={register}
        defaultChecked
      />
      Ativo?
      <Box dir="rtl">
        <Button
          color="primary"
          {...buttonProps}
          onClick={() => onSubmit(getValues(), null)}
        >
          Salvar
        </Button>
        <Button {...buttonProps} type="submit">
          Salvar e continuar editando
        </Button>
      </Box>
    </form>
  );
};
