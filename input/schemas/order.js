export default {
    title: "Order",
    name: "order",
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
      {
        title: "CreatedAt",
        name: "createdAt",
        type: "datetime",
      },
      {
        title: "paymentResult",
        name: "paymentResult",
        type: "paymentResult",
      },
      {
        name: "paymentMethod",
        title: "paymentMethod",
        type: "string",
      },
      {
        name: "image",
        title: "Image",
        type: "string",
      },
    ],
  };