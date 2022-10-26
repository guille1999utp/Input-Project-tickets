import nc from "next-connect";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";
import client from "../../../utils/client";

const handler = nc();

handler.post(async (req, res) => {
  const user = await client.fetch(`*[_type == "user" && email == $email][0]`, {
    email: req.body.email,
  });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  }
  const admin = await client.fetch(
    `*[_type == "organizadores" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (admin && req.body.password === admin.password) {
    const token = signToken({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      rol: admin.rol,
    });
    res.send({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      rol: admin.rol,
      token,
    });
  }
  const staff = await client.fetch(
    `*[_type == "staff" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (staff && req.body.password === staff.password) {
    const token = signToken({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      rol: staff.rol,
    });
    res.send({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      rol: staff.rol,
      token,
    });
  } else {
    res.status(401).send({ message: "Email o Contraseña invaldos" });
  }
});

export default handler;
