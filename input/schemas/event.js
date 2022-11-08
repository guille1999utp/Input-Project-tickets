export default {
  name: "eventos",
  title: "Eventos",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "referente",
      title: "Referente",
      type: "reference",
      to: [{ type: "organizadores" }],
    },
    {
      name: "nombre",
      title: "Nombre",
      type: "string",
    },
    {
      name: "artista",
      title: "Artista",
      type: "string",
    },

    {
      name: "ciudad",
      title: "Ciudad",
      type: "string",
    },
    {
      name: "fecha",
      title: "Fecha",
      type: "date",
    },

    {
      name: "lugar",
      title: "Lugar",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "nombre",
        maxLength: 96,
      },
    },
    {
      name: "hora",
      title: "hora",
      type: "string",
    },
    {
      name: "descripcion",
      title: "Descripcion",
      type: "string",
    },
    {
      name: "boletas",
      title: "Boletas",
      type: "number",
    },
    {
      name: "precio",
      title: "Precio",
      type: "number",
    },
    {
      name: "totalTickets",
      title: "Tickets Totales",
      type: "number",
    },
    {
      name: "ticketVendidos",
      title: "Tickets Vendidos",
      type: "number",
    },
    {
      name: "categoria",
      title: "Categoria",
      type: "string",
    },
  ],
};
