export default {
    title: "Order Item",
    name: "orderItem",
    type: "object",
    fields: [ 
      {
      title: "User",
      name: "user",
      type: "reference",
      to: [{ type: "user" }],
      options: {
        disableNew: true,
      },
      },
      {
        title: "Evento",
        name: "evento",
        type: "reference",
        to: [{ type: "eventos" }]
      },
      {
        title: "quantity",
        name: "quantity",
        type: "number",
      },
      {
        title: "image",
        name: "image",
        type: "string",
      },
      {
        title: "price",
        name: "price",
        type: "number",
      },
      {
        title: "tickets available ",
        name: "ticketsAvailable",
        type: "number",
      },
      {
        title: "IsPaid",
        name: "isPaid",
        type: "boolean",
      },
    ],
  };