
import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import client from "../../../utils/client";

const handler = nc();

handler.use(isAuth);
handler.post(async (req, res) => {
    try {
        const users = await client.fetch(
          `*[_type == "staff" && referente._ref == $idReferente && evento._ref == $idEvento]`,
          {
            idReferente: req.user._id,
            idEvento: req.body.idEvento
          }
        );
        // console.log(req.user, users);
        res.send(users);
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
  }
);

export default handler;
