import nc from "next-connect";
import transporter from "../../../utils/nodemailer";
import client from "../../../utils/client";
import axios from "axios";
import config from "../../../utils/config";
const handler = nc();
handler.post(async (req, res) => {
  const {
    type,
    data: { id },
  } = req.body;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

  try {
    if (id !== "123456789") {
      const compra = await axios.get(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );
      console.log(compra);

      const order = await client.fetch(
        `*[_type == "order" && _id == $id_shop]`,
        {
          id_shop: compra.data.metadata.id_shop,
        }
      );

      console.log(req.body,compra,order);
      if (order && type === "payment" && compra.data.status === "approved" && compra.data.status_detail === "accredited") {
        await axios.post(
          `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
          {
            mutations: [
              {
                patch: {
                  id: compra.data.metadata.id_shop,
                  set: {
                    isPaid: true,
                    paymentResult:compra.data.status_detail,
                    paymentMethod:compra.data.order.type
                  },
                },
              },
            ],
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${tokenWithWriteAccess}`,
            },
          }
          );
          
          const orderItem = await client.fetch(
            `*[_type == "orderItem" && _id == $id_order_item]`,
            {
              id_order_item: order[0].orderItem._ref,
            }
            );
            
        console.log(orderItem,order[0].orderItem);
            
        for (let i = 0; i < orderItem[0].tickets.length; i++) {
          const user = await client.fetch(
            `*[_type == "ticket" && _id == $idUser]`,
            {
              idUser: orderItem[0].tickets[i]._ref,
            }
          );
          console.log(user);
          await transporter.sendMail({
            from: `"guillermo.penaranda@utp.edu.co" <${process.env.CORREO_SECRET}>`, // sender address
            to: user[0].correo, // list of receivers
            subject: `Voleteria.com -> ticket entrada al evento`, // Subject line
            text: "", // plain text body
            html: `
            <b>el siguiente qr se debe mostrar exclusivamente al guardia para poder hacer valida la entrada con qr </b>
            <br />
            <br />
            <br />
            <img src="cid:unique@nodemailer.com"/>
            `, // html body
            attachments: [
              {
                path: orderItem[0].imagesQR[i],
                cid: "unique@nodemailer.com", //same cid value as in the html img src
              },
            ],
          });
        }
      }
    }
    res.status(200).send("OK");
  } catch (error) {
    console.log(error);
  }
});

export default handler;
