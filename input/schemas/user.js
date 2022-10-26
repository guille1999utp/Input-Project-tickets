export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "referente",
      title: "Referente",
      type: "reference",
      to: [{ type: "user" }],
    },
    {
      name: "tipoDocumento",
      title: "TipoDocumento",
      type: "string",
    },
    {
      name: "documento",
      title: "Documento",
      type: "string",
    },
    {
      name: "celular",
      title: "Celular",
      type: "string",
    },
    {
      name: "fecha",
      title: "Fecha",
      type: "string",
    },
    {
      name: "genero",
      title: "Genero",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "password",
      title: "Password",
      type: "string",
    },
  ],
};
