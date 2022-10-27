export default {
    title: "Tickets",
    name: "ticket",
    type: "document",
    fields: [ 
      {
        title: "Name",
        name: "name",
        type: "string",
      },
      {
        title: "Genero",
        name: "genero",
        type: "string",
      },
      {
        name: "evento",
        title: "Evento",
        type: "reference",
        to: [{ type: "eventos" }],
      },
      {
        title: "Cedula",
        name: "cedula",
        type: "string",
      },
      {
        title: "Correo",
        name: "correo",
        type: "string",
      },
      {
        title: "Activado",
        name: "activado",
        type: "boolean",
      },
    ],
  };