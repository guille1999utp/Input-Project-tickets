import nc from "next-connect";
import QRCode from 'qrcode'
import { isAuth } from "../../../utils/auth";
import config from "../../../utils/config";
import axios from "axios";
import transporter from "../../../utils/nodemailer";

const handler = nc();
handler.use(isAuth);

handler.post(async (req, res) => {
    const { evento,users,...resBody } = req.body;
    const projectId = config.projectId;
    const dataset = config.dataset;
    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
    let qrCodesId = []
    let qrImagesId = []
    try {
        for (let i = 0; i < resBody.quantity; i++) {
          const { data } = await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            {
              mutations: [
                {
                  create: {
                    _type: "ticket",
                    ...users[i],
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
          qrCodesId.push(
            {
              _key: data.results[0].id,
              _ref: data.results[0].id,
            }
            );
            
          const resImage = await QRCode.toDataURL(`localhost:3000/pruebaQR/${data.results[0].id}`);
          qrImagesId.push(resImage);
          const image = `<img src="${resImage}" />`
          console.log(image);
          await transporter.sendMail({
            from: `"guillermo.penaranda@utp.edu.co" <${process.env.CORREO_SECRET}>`, // sender address
            to: correo[i], // list of receivers
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
              path: resImage,
              cid: 'unique@nodemailer.com' //same cid value as in the html img src
          }]
          });


        }
        const { data } = await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            {
              mutations: [
                {
                  create: {
                    _type: "orderItem",
                    ticketsAvailable:resBody.quantity,
                    evento: {
                      _type: "reference",
                      _ref: evento.id,
                    },
                    tickets:qrCodesId,
                    imagesQR:qrImagesId
                    ,
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

        let { data:dataOrder } = await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            {
              mutations: [
                {
                  create: {
                    _type: "order",
                    createdAt: new Date().toISOString(),
                    ...resBody,
                    user: {
                      _type: "reference",
                      _ref: req.user._id,
                    },
                    orderItem: {
                      _type: "reference",
                      _ref: data.results[0].id,
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

        res.status(200).json(dataOrder);
    } catch (error) {
        console.log(error);
    }
  });

 export default handler;
