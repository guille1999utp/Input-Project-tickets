export default {
    title: "Order Item",
    name: "orderItem",
    type: "document",
    fields: [ 
      {
        title: "tickets available ",
        name: "ticketsAvailable",
        type: "number",
      },
      {
        title: "Evento",
        name: "evento",
        type: "reference",
        to: [{ type: "eventos" }]
      },
    ],
  };