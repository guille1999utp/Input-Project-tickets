import nc from "next-connect";
import QRCode from 'qrcode'
import { isAuth } from "../../../utils/auth";
import config from "../../../utils/config";
import axios from "axios";

const handler = nc();
handler.use(isAuth);

handler.post(async (req, res) => {
    const projectId = config.projectId;
    const dataset = config.dataset;
    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
    try {
        const { dataOrderItem } = await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            {
              mutations: [
                {
                  create: {
                    _type: "orderItem",
                    ticketsAvailable:req.body.quantity,
                    evento: {
                      _type: "reference",
                      _ref: req.body.evento.id,
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

        const resImage = await QRCode.toDataURL(`localhost:3000/pruebaQR/${dataOrderItem.results[0].id}`);

        const { data } = await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            {
              mutations: [
                {
                  create: {
                    _type: "order",
                    createdAt: new Date().toISOString(),
                    ...req.body,
                    image: resImage,
                    user: {
                      _type: "reference",
                      _ref: req.user._id,
                    },
                    orderItem: {
                      _type: "reference",
                      _ref: dataOrderItem.results[0].id,
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

        console.log(data);
        res.statusCode(200).send(data);
    } catch (error) {
        console.log(error);
    }


  res.send(colecciones);
});

export default handler;
