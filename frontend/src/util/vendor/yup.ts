import * as yup from "yup";
import {
  ArrayLocale,
  BooleanLocale,
  DateLocale,
  MixedLocale,
  NumberLocale,
  ObjectLocale,
  StringLocale,
} from "yup/lib/locale";

interface LocaleObject {
  mixed?: MixedLocale;
  string?: StringLocale;
  number?: NumberLocale;
  date?: DateLocale;
  boolean?: BooleanLocale;
  object?: ObjectLocale;
  array?: ArrayLocale;
}

const ptBR: LocaleObject = {
  array: {
    // eslint-disable-next-line
    max: "${path} não pode ter mais que ${max} itens",
    // eslint-disable-next-line
    min: "${path} não pode ter menos que ${min} itens",
  },
  mixed: {
    // eslint-disable-next-line
    required: "${path} é obrigatório",
  },
  string: {
    // eslint-disable-next-line
    max: "${path} não pode ter mais que ${max} caracteres",
    // eslint-disable-next-line
    min: "${path} não pode ter menos que ${min} caracteres",
  },
  number: {
    // eslint-disable-next-line
    min: "${path} não pode ser menor que ${max}",
  },
};

yup.setLocale(ptBR);

export default yup;
