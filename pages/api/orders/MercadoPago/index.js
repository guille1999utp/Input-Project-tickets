import mercadopago from "../../../../utils/mercadoPago";
import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
  let preference = {
    notification_url:
      "https://nuddyminds.vercel.app/api/orders/MercadoPago/response",
    items: req.body.orderItems.map((producto) => {
      return {
        title: producto.name,
        unit_price: producto.price,
        quantity: producto.quantity,
        description: producto.size,
      };
    }),
  };

  try {
    const response = await mercadopago.preferences.create(preference);

    res.status(201).json({
      global: response.body.id,
    });
  } catch (error) {
    res.status(400).json({ error: "error en la peticion" });
  }
});

export default handler;
