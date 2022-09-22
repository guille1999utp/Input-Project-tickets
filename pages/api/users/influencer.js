import nc from "next-connect";

import axios from "axios";
import config from "../../../utils/config";
import { signToken } from "../../../utils/auth";
import client from "../../../utils/client";

const handler = nc();

handler.post(async (req, res) => {
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const createMutations = [
    {
      create: {
        _type: "influencer",
        name: req.body.username,
        email: req.body.email,
        instagram: req.body.instagram,
        checked: false,
      },
    },
  ];
  const existInfluencer = await client.fetch(
    `*[_type == "influencer" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (existInfluencer) {
    return res.status(401).send({ message: "Este email ya esta registrado" });
  }
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
  const innfluencerId = data.results[0].id;
  const influencer = {
    _id: innfluencerId,
    name: req.body.username,
    email: req.body.email,
    instagram: req.body.instagram,
    checked: false,
  };
  const token = signToken(influencer);
  res.send({ ...influencer, token });
});

export default handler;
