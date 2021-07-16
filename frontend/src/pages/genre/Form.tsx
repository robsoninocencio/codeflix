import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button, { ButtonProps } from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";

import genreHttp from "../../util/http/genre-http";
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

interface IGenre {
  id: string;
  name: string;
  categories_id: [];
  is_active: number;
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
  categories_id: yup.array().min(1).label("Categorias").required(),
});

export const Form = () => {
  const { register, handleSubmit, getValues, setValue, errors, reset, watch } =
    useForm<{ name; categories_id }>({
      validationSchema,
      defaultValues: { categories_id: [] },
    });

  const classes = useStyles();
  const snackbar = useSnackbar();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [genre, setGenre] = useState<{ id: string } | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const buttonProps: ButtonProps = {
    className: classes.submit,
    color: "secondary",
    variant: "contained",
    disabled: loading,
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const promises = [categoryHttp.list()];
      if (id) {
        promises.push(genreHttp.get(id));
      }
      try {
        const [categoriesResponse, genreResponse] = await Promise.all(promises);
        setCategories(categoriesResponse.data.data);
        if (id) {
          setGenre(genreResponse.data.data);
          reset({
            ...genreResponse.data.data,
            categories_id: genreResponse.data.data.categories.map(
              (category) => category.id
            ),
          });
        }
      } catch (error) {
        console.error(error);
        snackbar.enqueueSnackbar("Não foi possível carregar as informações", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, reset, snackbar]);

  useEffect(() => {
    register({ name: "categories_id" });
  }, [register]);

  async function onSubmit(formData, event) {
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
    if (formData.categories_id.length <= 0) {
      snackbar.enqueueSnackbar("Categoria é obrigatório", { variant: "error" });
      return;
    }
    setLoading(true);
    try {
      const http = !genre
        ? genreHttp.create(formData)
        : genreHttp.update(genre.id, formData);
      const { data } = await http;
      snackbar.enqueueSnackbar("Gênero salvo com sucesso", {
        variant: "success",
      });
      setTimeout(() => {
        event
          ? id
            ? history.replace(`/genres/${data.data.id}/edit`)
            : history.push(`/genres/${data.data.id}/edit`)
          : history.push("/genres");
      }, 1000);
    } catch (error) {
      console.error(error);
      snackbar.enqueueSnackbar("Não foi possível salvar o gênero", {
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
        select
        name="categories_id"
        value={watch("categories_id")}
        label="Categorias"
        margin={"normal"}
        variant="outlined"
        fullWidth
        onChange={(e) => {
          setValue("categories_id", e.target.value);
        }}
        SelectProps={{ multiple: true }}
        disabled={loading}
        error={errors.categories_id !== undefined}
        helperText={errors.categories_id && errors.categories_id.message}
        InputLabelProps={{ shrink: true }}
      >
        <MenuItem value="" disabled>
          <em>Selecione categorias</em>
        </MenuItem>
        {categories.map((category, key) => (
          <MenuItem key={key} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

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
