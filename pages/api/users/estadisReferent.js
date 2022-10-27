
import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import client from "../../../utils/client";

const handler = nc();

handler.use(isAuth);
handler.post(async (req, res) => {
    try {
        const ticket = await client.fetch(
          `*[_type == "ticket" && evento._ref == $idEvento]`,
          {
            idEvento: req.body.idEvento
          }
        );
        // console.log(req.user, users);
        res.send(ticket);
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
  }
);

export default handler;
