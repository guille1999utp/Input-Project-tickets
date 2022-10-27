export default {
  name: "organizadores",
  title: "Organizadores",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
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

    {
      name: "rol",
      title: "Rol",
      type: "string",
      options: {
        list: [{ title: "Admin", value: "Admin" }],
      },
    },
  ],
};
