import nc from "next-connect";
import { isAuth } from "../../utils/auth";
import config from "../../utils/config";
import axios from "axios";
import client from "../../utils/client";
const handler = nc();
handler.use(isAuth);

handler.post(async (req, res) => {
    const { id } = req.body;
    const projectId = config.projectId;
    const dataset = config.dataset;
    const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
    console.log(id)
    try {
        
        if(["Admin"].includes(req.user.rol)){
        const ticket = await client.fetch(
            `*[_type == "ticket" && _id == $ticket][0]`,
            {
              ticket: id,
            }
          );

        const evento = await client.fetch(
            `*[_type == "eventos" && referente._ref == $id && _id == $idEvento][0]`,
            {
              id: req.user._id,
              idEvento:ticket.evento._ref
            }
          );

            if(evento){
            const { data } = await axios.post(
                `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
                {
                  mutations: [
                    {
                      patch: {
                        id,
                        set:{
                            activado: true
                        }
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
              res.status(200).json({data});
            }else{
              res.status(401).json({error:"not authorized"});
            }
           
        }else if(["Guard"].includes(req.user.rol)){
            const guard = await client.fetch(
                `*[_type == "staff" && _id == $id][0]`,
                {
                  id: req.user._id,
                }
              );

            const ticket = await client.fetch(
                `*[_type == "ticket" && _id == $ticket][0]`,
                {
                  ticket: id,
                }
              );
              if(ticket.evento._ref === guard.evento._ref){
                  const { data } = await axios.post(
                      `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
                      {
                        mutations: [
                          {
                            patch: {
                              id,
                              set:{
                                  activado: true
                              }
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
                    res.status(200).json({data});
              }else{
                res.status(401).json({error: "no authorization"});
              }
        }
        else{
            res.status(401).json({error: "no authorization"});
        }
          

    } catch (error) {
        console.log(error);
    }
  });

 export default handler;
