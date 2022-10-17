import nc from "next-connect";
import QRCode from 'qrcode'
import { isAuth } from "../../../utils/auth";
import config from "../../../utils/config";
import axios from "axios";
import client from "../../../utils/client";
import mercadopago from "../../../utils/mercadoPago";
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
      const Event = await client.fetch(`*[_type == "eventos" && _id == $idEvent]`, {
        idEvent: evento,
      });

      let preference = {
        additional_info:"idunicomelapela",
        notification_url:"https://input-project-tickets-guille.vercel.app/api/webhooks/mercadoPago",
        items: [{
            title: Event[0].nombre,
            unit_price: Event[0].precio,
            quantity: parseInt(resBody.quantity),
            description: Event[0].artista,
          }]
      };
      console.log(users);
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
        }
        const { data } = await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            {
              mutations: [
                {
                  create: {
                    _type: "orderItem",
                    ticketsAvailable:parseInt(resBody.quantity),
                    evento: {
                      _type: "reference",
                      _ref: evento,
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
        await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            {
              mutations: [
                {
                  create: {
                    _type: "order",
                    createdAt: new Date().toISOString(),
                    isPaid:false,
                    price:Event[0].precio * parseInt(resBody.quantity),
                    quantity: parseInt(resBody.quantity),
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

          const response = await mercadopago.preferences.create(preference);
          console.log(response);

          await axios.post(
            `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
            {
              mutations: [
                {
                  patch: {
                    id: data.results[0].id,
                    set: {
                      userMercadoPago: response.body.client_id,
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


        res.status(200).json({global: response.body.id});
    } catch (error) {
        console.log(error);
    }
  });

 export default handler;
