import axios from "axios";
import client from "../client";
import config from "../config";
import transporter from "../nodemailer";
import QRCode from 'qrcode'
const isFree = async (req, res, next) => {
  const { evento, users } = req.body;
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  try {
    const event = await client.fetch(`*[_type == "eventos" && _id == $idEvent]`, {
      idEvent: evento,
    });

    console.log("entro")
    if (event[0].precio >=1 ) {
          req.evento = event;
          next();
    } else if(event[0].precio === 0){
      for (let i = 0; i < users.length; i++) {
        const { data } = await axios.post(
          `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
          {
            mutations: [
              {
                create: {
                  _type: "ticket",
                  cedula:users[i].cedula,
                  name:users[i].name,
                  genero:users[i].genero,
                  correo:users[i].correo,
                  evento: {
                    _type: "reference",
                    _ref: evento,
                  },
                  activado:false
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
          
        const resImage = await QRCode.toDataURL(`localhost:3000/pruebaQR/${data.results[0].id}`);
  
        await transporter.sendMail({
          from: `"guillermo.penaranda@utp.edu.co" <${process.env.CORREO_SECRET}>`, // sender address
          to: users[0].correo, // list of receivers
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
              path: resImage,
              cid: "unique@nodemailer.com", //same cid value as in the html img src
            },
          ],
        });
      }
      res.status(200).json({global: "isFree"});
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({error: "isFree"});
  }
  
};
export { isFree };