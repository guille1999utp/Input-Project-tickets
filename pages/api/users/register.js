import nc from "next-connect";
import bcrypt from "bcryptjs";
import axios from "axios";
import config from "../../../utils/config";
import { signToken } from "../../../utils/auth";
import client from "../../../utils/client";

const handler = nc();

handler.post(async (req, res) => {
  console.log(req.body);
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const rol = req.body.rol ? req.body.rol : "User";

  const createMutations = [
    {
      create: {
        _type: "user",
        name: req.body.name || req.body.email,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        tipoDocumento: req.body.tipoDocumento,
        documento: req.body.documento,
        celular: req.body.celular,
        fecha: req.body.fecha,
        genero: req.body.genero,
        rol,
      },
    },
  ];

  console.log(createMutations);
  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );

  if (existUser) {
    return res.status(401).send({ message: "Este email ya esta registrado" });
  }
  try {
    const { data } = await axios.post(
      `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
      { mutations: createMutations },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${tokenWithWriteAccess}`,
        },
      }
    );
    const userId = data.results[0].id;
    const user = {
      _id: userId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol,
    };
    const token = signToken(user);
    console.log(userId);
    res.send({ ...user, token });
  } catch (error) {
    console.log(error);
  }
});

export default handler;
