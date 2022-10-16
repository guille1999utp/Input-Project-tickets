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
      {
        title: "User MercadoPago",
        name: "userMercadoPago",
        type: "string",
      },
      {
        title: "Tickets",
        name: "tickets",
        type: "array",
        of: [
          {type: 'reference',to: [{type: 'ticket'}]}
        ] 
      },
      {
        title: "Images QR",
        name: "imagesQR",
        type: "array",
        of: [
          {type: 'string'}
        ] 
      },
    ],
  };