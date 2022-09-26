import client from "../client";

const isEventAuthorizationQR = async (req, res, next) => {
  const { rol,_id:idUser } = req.user;
  const orden = await client.fetch(`*[_type == "order" && orderItem._ref == $refOrder]`, {
    refOrder: req.query.id,
  });
  if (rol == "Admin" || rol == "Guard" || orden[0].user._ref == idUser) {
        req.orden = orden;
        next();
  } else {
    res.status(401).json({ message: "you do not have permission to view this qr code" });
  }
};
export { isEventAuthorizationQR };
