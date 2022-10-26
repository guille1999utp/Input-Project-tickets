export default {
  name: "staff",
  title: "Staff",
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
        list: [
          { title: "Admin", value: "Admin" },
          { title: "User", value: "User" },
          { title: "Guard", value: "Guard" },
        ],
      },
    },
  ],
};
