import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { FormHelperText, makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button, { ButtonProps } from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { useSnackbar } from "notistack";

import castMemberHttp from "../../util/http/cast-member-http";
import yup from "../../util/vendor/yup";

interface ICastMember {
  id: string;
  name: string;
  type: number;
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
  type: yup.number().label("Tipo").required(),
});

export const Form = () => {
  const { register, handleSubmit, getValues, setValue, errors, reset, watch } =
    useForm<ICastMember>({
      validationSchema,
    });

  const classes = useStyles();
  const snackbar = useSnackbar();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const [castMember, setCastMember] = useState<ICastMember | null>(null);
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

    async function getCastMember() {
      setLoading(true);
      try {
        const { data } = await castMemberHttp.get(id);
        setCastMember(data.data);
        reset(data.data);
      } catch (error) {
        console.error(error);
        snackbar.enqueueSnackbar("Não foi possível carregar as informações", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }

    getCastMember();
  }, [id, reset, snackbar]);

  useEffect(() => {
    register({ name: "type" });
  }, [register]);

  async function onSubmit(formData: ICastMember, event: any) {
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
    if (!formData.type) {
      snackbar.enqueueSnackbar("Tipo é obrigatório", { variant: "error" });
      return;
    }
    setLoading(true);
    try {
      const http = !castMember
        ? castMemberHttp.create(formData)
        : castMemberHttp.update(castMember.id, formData);
      const { data } = await http;
      snackbar.enqueueSnackbar("Membro do elenco salvo com sucesso", {
        variant: "success",
      });
      setTimeout(() => {
        event
          ? id
            ? history.replace(`/cast-members/${data.data.id}/edit`)
            : history.push(`/cast-members/${data.data.id}/edit`)
          : history.push("/cast-members");
      }, 1000);
    } catch (error) {
      console.error(error);
      snackbar.enqueueSnackbar("Não foi possível salvar o Membro do elenco", {
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
      <FormControl
        margin={"normal"}
        error={errors.type !== undefined}
        disabled={loading}
      >
        <FormLabel component="legend">Tipo</FormLabel>
        <RadioGroup
          aria-label="tipo"
          name="type"
          onChange={(e) => {
            setValue("type", parseInt(e.target.value));
          }}
          value={watch("type") + ""}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="Diretor"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="Ator"
          />
        </RadioGroup>
        {errors.type && (
          <FormHelperText id="type-helper-text">
            {errors.type.message}
          </FormHelperText>
        )}
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
