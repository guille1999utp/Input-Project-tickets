import nc from "next-connect";
import client from "../../../../utils/client";
import { isAuth } from "../../../../utils/auth";
import { isEventAuthorizationQR } from "../../../../utils/middlewares/qrVision";

const handler = nc();
handler.use(isAuth);
handler.use(isEventAuthorizationQR);

handler.get(async (req, res) => {
  res.send(req.orden);
});
export default handler;
