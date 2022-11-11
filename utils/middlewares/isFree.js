import axios from "axios";
import client from "../client";
import config from "../config";
import transporter from "../nodemailer";
import QRCode from "qrcode";
import { urlFor } from "../image";
const isFree = async (req, res, next) => {
  const { evento, users } = req.body;
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  try {
    const event = await client.fetch(
      `*[_type == "eventos" && _id == $idEvent]`,
      {
        idEvent: evento,
      }
    );

    console.log("entro");
    if (event[0].precio >= 1) {
      req.evento = event;
      next();
    } else if (event[0].precio === 0) {
      for (let i = 0; i < users.length; i++) {
        const { data } = await axios.post(
          `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
          {
            mutations: [
              {
                create: {
                  _type: "ticket",
                  cedula: users[i].cedula,
                  name: users[i].name,
                  genero: users[i].genero,
                  correo: users[i].correo,
                  edad: users[i].edad,
                  identificacion: users[i].identificacion,
                  empresa: users[i].empresa,
                  evento: {
                    _type: "reference",
                    _ref: evento,
                  },
                  activado: false,
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

        await axios.post(
          `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
          {
            mutations: [
              {
                patch: {
                  id: evento,
                  inc: {
                    ticketVendidos: 1,
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

        const resImage = await QRCode.toDataURL(
          `localhost:3000/pruebaQR/${data.results[0].id}`
        );

        await transporter.sendMail({
          from: `"inputlatam@gmail.com" <${process.env.CORREO_SECRET}>`, // sender address
          to: users[0].correo, // list of receivers
          subject: `inputlatam.com -> Entrada ${event[0].nombre}`, // Subject line
          text: "", // plain text body
          html: `
          <div style="width: 100%;background-color: rgb(52, 200, 113);padding: 50px;box-sizing: border-box;">
          <h1 style="margin: 0px 0 10px 0;font-size: 55px;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">INPUT</h1>
          <div
              style="width: 100%;border: 9px solid black;background-color: white;padding: 50px 40px 20px 40px;box-sizing: border-box;">
              <h1 style="margin: 0;font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;font-size: 35px;">${event[0].nombre}</h1>
              <div style="display: flex;flex-direction: row;justify-content: space-between;">
                  <div style="width: 50%;min-width: 50vh;">
                      <p style="font-size: 29px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">Jueves 17 nov,2022</p>
                      <p style="font-size: 25px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">Hora: ${event[0].hora}</p>
                      <p style="font-size: 25px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">${event[0].lugar},${event[0].ciudad}</p>
                      <p style="font-size: 25px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">Acceso general: $0.00</p>
                      <img style="width: 70%;"
                      src="cid:unique@nodemailer.com" />
                  </div>
                  <div style="width: 50%;min-width: 50vh;">
                      <p style="font-size: 25px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">Titular: ${event[0].artista}</p>
                      <p style="font-size: 25px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">ID: ${data.results[0].id}</p>
                      <p style="font-size: 25px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">Ticket No. ${event[0].totalTickets - (event[0].totalTickets - (i+1+event[0].ticketVendidos))}</p>
                      <p style="font-size: 25px;margin: 10px 0;font-family: Arial, Helvetica, sans-serif;">Orden No. 882138</p>
                      <div>
                      <img style="width: 100%;border: 4px solid black;padding: 40px;box-sizing: border-box;"
                          src="${urlFor(event[0].image[0])}" />
                  </div>
                  </div>
                  
              </div>
          </div>
          <h3 style="color: white;font-size: 30px;font-family: Arial, Helvetica, sans-serif;font-weight: 300;">AVISO:</h3>
          <p style="font-size: 25px;font-family: Arial, Helvetica, sans-serif;">
              El titular de este ticket es el único responsable de su confidencialidad. Este código es válido para un
              único acceso y su duplicidad puede denegar el acceso si ya ha sido escaneado
              anteriormente. Ni el organizador del evento ni INPUT son responsables por cualquier inconveniente o pérdida
              por duplicación. En el caso de duplicación, el promotor se reserva el derecho de
              no permitir el acceso al portador de este ticket. Recuerda guardar este Ticket y llevarlo al evento con tu
              documento de identidad
          </p>
      </div>
          `, // html body
          attachments: [
            {
              path: resImage,
              cid: "unique@nodemailer.com", //same cid value as in the html img src
            },
          ],
        });
      }
      res.status(200).json({ global: "isFree" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "isFree" });
  }
};
export { isFree };
