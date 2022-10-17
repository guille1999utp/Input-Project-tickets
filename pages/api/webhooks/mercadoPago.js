import nc from "next-connect";
import transporter from "../../../utils/nodemailer";
import client from "../../../utils/client";
import axios from "axios";
const handler = nc();
handler.post(async (req, res) => {
  const { user_id,type,data:{id} } = req.body;
  const compra = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`,{
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
    },
  });
  console.log(compra);


  try {
    const orderItem = await client.fetch(`*[_type == "orderItem" && userMercadoPago == $idOrder]`, {
      idOrder: user_id,
    });
      console.log(req.body,orderItem)
      if(orderItem && type === "payment") {
        for (let i = 0; i < orderItem.tickets.length; i++) {
          const user = await client.fetch(`*[_type == "ticket" && _id == $idUser]`, {
            idUser: orderItem.tickets[i],
          });
          await transporter.sendMail({
            from: `"guillermo.penaranda@utp.edu.co" <${process.env.CORREO_SECRET}>`, // sender address
            to: user.correo, // list of receivers
            subject: `Voleteria.com -> ticket entrada al evento`, // Subject line
            text: "", // plain text body
            html: `
            <b>el siguiente qr se debe mostrar exclusivamente al guardia para poder hacer valida la entrada con qr </b>
            <br />
            <br />
            <br />
            <img src="cid:unique@nodemailer.com"/>
            `, // html body
            attachments: [{
              path: orderItem.imagesQR[i],
              cid: 'unique@nodemailer.com' //same cid value as in the html img src
            }]
          });
          
          
        }
      }
        res.status(200).send("OK");
      } catch (error) {
        console.log(error);
    }
  });
  
  export default handler;
  