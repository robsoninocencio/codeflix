const yup = require("yup");

const schema = yup.object().shape({
  name: yup.string().required(),
  num: yup.number(),
});

console.log(schema.cast({ name: "teste", num: "2" }));

schema.isValid({ name: "isValid" }).then((isValid) => console.log(isValid));

schema
  .validate({ name: "validate", num: "aaaa" })
  .then((values) => console.log(values))
  .catch((errors) => console.log(errors));
