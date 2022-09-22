import NextCors from "nextjs-cors";
import axios from "axios";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  try {
    const id = req.query["data.id"];
    const { data } = await axios.get(
      `https://api.mercadopago.com/v1/payments/${id}?access_token=${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
    );
    console.log(data);
    // const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

    // await axios.post(
    //   `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
    //   {
    //     mutations: [
    //       {
    //         patch: {
    //           id: req.body.unitario._key,
    //           set: {
    //             isPaid: data.status,
    //             paidAt: new Date().toISOString(),
    //             "paymentResult.id": id,
    //             "paymentResult.status": req.body.email_address,
    //             "paymentResult.email_address": req.body.id,
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: `Bearer ${tokenWithWriteAccess}`,
    //     },
    //   }
    // );
  } catch (error) {
    console.log(req.query["data.id"]);

    console.log(error);
  }

  res.status(200).json({ Ok: true });
}
