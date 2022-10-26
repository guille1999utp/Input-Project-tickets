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
      title: "eventos",
      name: "eventos",
      type: "array",
      of: [{ type: "eventos" }],
    },
    {
      name: "rol",
      title: "Rol",
      type: "string",
      options: {
        list: [
          { title: "Admin", value: "Admin" },
          { title: "User", value: "User" },
          { title: "Guard", value: "Guard" },
        ],
      },
    },
  ],
};
