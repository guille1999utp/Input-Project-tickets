import nc from "next-connect";
import transporter from "../../../utils/nodemailer";
import client from "../../../utils/client";
const handler = nc();
handler.post(async (req, res) => {
  console.log(req.body)
  const { user_id,type } = req.body;
    try {
      const orderItem = await client.fetch(`*[_type == "orderItem" && userMercadoPago == $idOrder]`, {
        idOrder: user_id,
      });
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
  