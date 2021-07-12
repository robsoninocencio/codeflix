import React, { useEffect, useState } from "react";
import { FormControlLabel, makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import categoryHttp from "../../util/http/category-http";
import yup from "../../util/vendor/yup";
import { useParams, useHistory } from "react-router";
import { setTimeout } from "timers";
import { useSnackbar } from "notistack";

interface ICategory {
  id: string;
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
  name: yup.string().label("Nome").required().min(3).max(255),
  is_active: yup.boolean(),
});

export const Form = () => {
  const classes = useStyles();

  const { register, handleSubmit, getValues, setValue, errors, reset, watch } =
    useForm<ICategory>({
      validationSchema,
      defaultValues: {
        name: "",
        is_active: true,
      },
    });

  const snackbar = useSnackbar();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const buttonProps: ButtonProps = {
    className: classes.submit,
    color: "secondary",
    variant: "contained",
    disabled: loading,
  };

  useEffect(() => {
    register({ name: "is_active" });
  }, [register]);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    categoryHttp
      .get(id)
      .then(({ data }) => {
        setCategory(data.data);
        reset(data.data);
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = (formData: ICategory, event: any) => {
    setLoading(true);
    const http = !category
      ? categoryHttp.create(formData)
      : categoryHttp.update(category.id, formData);
    http
      .then(({ data }) => {
        snackbar.enqueueSnackbar("Categoria salva com sucesso", {
          variant: "success",
        });
        setTimeout(() => {
          event
            ? id
              ? history.replace(`/categories/${data.data.id}/edit`)
              : history.push(`/categories/${data.data.id}/edit`)
            : history.push("/categories");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        snackbar.enqueueSnackbar("Não foi possível salvar a categoria", {
          variant: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="name"
        label="Nome"
        fullWidth
        variant="outlined"
        inputRef={register}
        disabled={loading}
        error={errors.name !== undefined}
        helperText={errors.name && errors.name.message}
        InputLabelProps={{ shrink: true }}
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
        disabled={loading}
        InputLabelProps={{ shrink: true }}
      />
      <FormControlLabel
        disabled={loading}
        control={
          <Checkbox
            name="is_active"
            color="primary"
            onChange={() => setValue("is_active", !getValues()["is_active"])}
            checked={watch("is_active")}
          />
        }
        label={"Ativo?"}
        labelPlacement={"end"}
      />
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
