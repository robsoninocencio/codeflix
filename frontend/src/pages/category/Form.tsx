import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  ButtonProps,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { setTimeout } from "timers";

import categoryHttp from "../../util/http/category-http";
import yup from "../../util/vendor/yup";

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
});

export const Form = () => {
  const { register, handleSubmit, getValues, setValue, errors, reset, watch } =
    useForm<ICategory>({
      validationSchema,
      defaultValues: {
        name: "",
        is_active: true,
      },
    });

  const classes = useStyles();
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
    if (!id) {
      return;
    }
    let isSubscribed = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await categoryHttp.get(id);
        if (isSubscribed) {
          setCategory(data.data);
          reset(data.data);
        }
      } catch (error) {
        console.error(error);
        snackbar.enqueueSnackbar(
          `Não foi possível carregar a categoria de id = ${id}`,
          { variant: "error" }
        );
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isSubscribed = false;
    };
  }, [id, reset, snackbar]);

  useEffect(() => {
    register({ name: "is_active" });
  }, [register]);

  async function onSubmit(formData: ICategory, event: any) {
    if (!formData.name) {
      snackbar.enqueueSnackbar("Nome é obrigatório", { variant: "error" });
      return;
    }
    if (formData.name.length < 3) {
      snackbar.enqueueSnackbar("Nome não pode ter menos que 3 caracteres", {
        variant: "error",
      });
      return;
    }
    if (formData.name.length > 255) {
      snackbar.enqueueSnackbar("Nome não pode ter mais que 255 caracteres", {
        variant: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const http = !category
        ? categoryHttp.create(formData)
        : categoryHttp.update(category.id, formData);
      const { data } = await http;
      snackbar.enqueueSnackbar("Categoria salva com sucesso", {
        variant: "success",
      });
      setTimeout(() => {
        event
          ? id // Clicou no botão Salvar e continuar editando
            ? history.replace(`/categories/${data.data.id}/edit`) // Está na tela de edição, então mantém na tela de edição
            : history.push(`/categories/${data.data.id}/edit`) // Está na tela de Criar, então envia para tela de edição
          : history.push("/categories"); // Clicou no botão Salvar, então envia para tela de listagem de categorias
      }, 1000);
    } catch (error) {
      console.log(error);
      snackbar.enqueueSnackbar("Não foi possível salvar a categoria", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }

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
