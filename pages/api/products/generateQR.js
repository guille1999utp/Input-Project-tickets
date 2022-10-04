import nc from "next-connect";
import QRCode from "qrcode";
import { isAuth } from "../../../utils/auth";
import config from "../../../utils/config";
import axios from "axios";

const handler = nc();
handler.use(isAuth);

handler.post(async (req, res) => {
  const { evento, ...resBody } = req.body;
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  try {
    const { data } = await axios.post(
      `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
      {
        mutations: [
          {
            create: {
              _type: "orderItem",
              ticketsAvailable: resBody.quantity,
              evento: {
                _type: "reference",
                _ref: evento.id,
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
    const resImage = await QRCode.toDataURL(
      `localhost:3000/pruebaQR/${data.results[0].id}`
    );
    console.log(resImage);

    const { data: dataOrder } = await axios.post(
      `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
      {
        mutations: [
          {
            create: {
              _type: "order",
              createdAt: new Date().toISOString(),
              ...resBody,
              imageQR: resImage,
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

    console.log(dataOrder);
    res.status(200).json(dataOrder);
  } catch (error) {
    console.log(error);
  }

  // res.send(colecciones);
});

export default handler;
