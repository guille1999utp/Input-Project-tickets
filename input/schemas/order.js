export default {
    title: "Order",
    name: "order",
    type: "document",
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
        title: "Order item",
        name: "orderItem",
        type: "reference",
        to: [{ type: "orderItem" }],
        options: {
          disableNew: true,
        },
        },
      {
        title: "quantity",
        name: "quantity",
        type: "number",
      },
      {
        title: "price",
        name: "price",
        type: "number",
      },
      {
        title: "IsPaid",
        name: "isPaid",
        type: "boolean",
      },
      {
        title: "Evento",
        name: "evento",
        type: "reference",
        to: [{ type: "eventos" }]
      },
      {
        title: "CreatedAt",
        name: "createdAt",
        type: "datetime",
      },
      {
        title: "Dia Pagado",
        name: "dayPay",
        type: "datetime",
      },
      {
        title: "paymentResult",
        name: "paymentResult",
        type: "string",
      },
      {
        name: "paymentMethod",
        title: "paymentMethod",
        type: "string",
      }
    ],
  };