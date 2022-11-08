import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { urlFor } from "../../utils/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";
import { Store } from "../../utils/Store";
import { urlForThumbnail } from "../../utils/image";
import { useRouter } from "next/router";
import Image from "next/image";
import { Troubleshoot } from "@mui/icons-material";
const EventoDestacado = ({ eventos, numero }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [quantity, setquantity] = useState(0);
  const { control, getValues } = useForm();
  const [pTotal, setpTotal] = useState(0);
  const { dispatch, state } = useContext(Store);
  const router = useRouter();
  const event = eventos[numero];
  console.log(eventos);
  useEffect(() => {
    setpTotal(getValues("cantidad") || 0 * event.precio);
  }, [getValues, state, setpTotal, eventos]);
  const cartHandler = () => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: event._id,
        name: event.nombre,
        slug: event.slug.current,
        price: event.precio,
        image: urlForThumbnail(event.image && event.image[0]),
        quantity,
      },
    });
    router.push("/compradores");
  };
  return (
    <Box
      display="flex"
      sx={{ width: "100%", backgroundColor: "rgb(34,34,34)" }}
    >
      <Grid container spacing={6}>
        <Grid item md={4} display="flex" className="gridCenter">
          <Image
            height="450px"
            width="450%"
            alt="evento destacado"
            src={urlFor(event.image[0])}
          />
        </Grid>
        <Grid
          item
          md={8}
          sx={{ pr: isDesktop ? "48px" : "0", maxWidth: "100%" }}
          display="flex"
          className="gridSpace"
        >
          <Box sx={{ width: "100%" }}>
            <Box display="flex" sx={{ color: "white" }}>
              <Typography
                sx={{
                  color: "grey",
                  ml: 3,
                  opacity: ".4",
                  fontSize: "1.2rem",
                  mt: 0,
                }}
                variant="h1"
                component="h6"
              >
                {event.categoria}
              </Typography>
              <Typography
                sx={{
                  color: "grey",
                  ml: 3,
                  opacity: ".4",
                  fontSize: "1.2rem",
                  mt: 0,
                }}
                variant="h1"
                component="h6"
              >
                {event.ciudad}
              </Typography>
              <Typography
                sx={{
                  color: "grey",
                  ml: 3,
                  opacity: ".4",
                  fontSize: "1.2rem",
                  mt: 0,
                }}
                variant="h1"
                component="h6"
              >
                {event.lugar}
              </Typography>
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                textAlign: isDesktop ? null : "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "2.2rem",
                mt: 0,
              }}
            >
              {event.nombre}
            </Typography>
            <Box
              sx={{
                backgroundColor: "yellow ",
                width: isDesktop ? "28%" : "100%",
                borderRadius: 5,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  width: isDesktop ? null : "100%",
                }}
                variant="h5"
              >
                Evento destacado #{numero + 1}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%", mt: 2 }}
              display="flex"
              justifyContent={isDesktop ? "start" : "center"}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.3rem",

                  opacity: ".4",
                }}
              >
                Precio por Boleta:{" "}
                {"$" + new Intl.NumberFormat().format(parseInt(event.precio))}
              </Typography>
            </Box>
            <Box
              sx={{ width: "100%", mt: 2 }}
              display="flex"
              justifyContent="space-around"
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.3rem",
                  ml: isDesktop ? 20 : 0,
                  opacity: ".4",
                }}
              ></Typography>
              <Typography
                sx={{
                  color: "white",
                  ml: isDesktop ? 20 : 10,
                  fontSize: "1.3rem",
                  opacity: ".4",
                }}
              >
                Cantidad
              </Typography>
            </Box>
            <Divider
              sx={{ color: "white", opacity: 1, backgroundColor: "white" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Controller
                name="localidad"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    disabled={true}
                    size="small"
                    margin="normal"
                    id="localidad"
                    select
                    sx={{
                      width: "75%",
                      backgroundColor: "white",
                      mt: 0.5,
                      mb: 0.5,
                    }}
                    {...field}
                  >
                    {["Platino"].map((option) => (
                      <MenuItem key={option} value={option}>
                        <Typography sx={{ textAlign: "center" }}>
                          {option}
                        </Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              ></Controller>

              <TextField
                size="small"
                margin="normal"
                select
                onChange={(e) => {
                  setpTotal(e.target.value * event.precio);
                  setquantity(e.target.value);
                }}
                sx={{
                  width: "23%",
                  backgroundColor: "white",
                  mt: 0.5,
                  mb: 0.5,
                }}
              >
                {event.boletas >= 3
                  ? ["1"].map((option) => (
                      <MenuItem key={option} value={option}>
                        <Typography sx={{ textAlign: "center" }}>
                          {option}
                        </Typography>
                      </MenuItem>
                    ))
                  : event.boletas === 2
                  ? ["1", "2"].map((option) => (
                      <MenuItem key={option} value={option}>
                        <Typography sx={{ textAlign: "center" }}>
                          {option}
                        </Typography>
                      </MenuItem>
                    ))
                  : event.boletas === 1
                  ? ["1"].map((option) => (
                      <MenuItem key={option} value={option}>
                        <Typography sx={{ textAlign: "center" }}>
                          {option}
                        </Typography>
                      </MenuItem>
                    ))
                  : ["0"].map((option) => (
                      <MenuItem key={option} value={option}>
                        <Typography sx={{ textAlign: "center" }}>
                          {option}
                        </Typography>
                      </MenuItem>
                    ))}
              </TextField>
            </Box>
            <Divider
              sx={{ color: "white", opacity: 1, backgroundColor: "white" }}
            />
            <Box
              sx={{ width: "100%", mt: 2 }}
              display="flex"
              justfyContent="center"
              alignItems="center"
            >
              <Box width="50%">
                {" "}
                <Typography
                  sx={{
                    textAlign: "end",
                    width: "100%",
                    fontSize: isDesktop ? "1.3rem" : "1rem",
                    color: "whitesmoke",
                    ml: isDesktop ? null : 2,
                  }}
                >
                  TOTAL A PAGAR <ArrowForwardIcon sx={{ ml: 1, mr: 1 }} />
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px solid white",
                  opacity: 0.5,
                  borderRadius: 2,
                  color: "white",
                  ml: isDesktop ? null : 2,
                }}
              >
                <Typography
                  sx={{
                    p: 5,
                    pb: 1,
                    pt: 1,
                    textAlign: "center",
                    width: "100%",
                    fontSize: "1.3rem",
                    color: "white",
                  }}
                >
                  {"$" + new Intl.NumberFormat().format(parseInt(pTotal))}
                </Typography>
              </Box>
            </Box>
            <Divider
              sx={{
                color: "white",
                opacity: 1,
                backgroundColor: "white",
                mt: 2,
              }}
            />
          </Box>

          <Box sx={{ width: "100%", alignSelf: "end", pt: 5 }}>
            <Box>
              <NextLink
                className="link"
                href={`/eventos/${event.slug.current}`}
                passHref
              >
                <Button
                  sx={{
                    padding: "12px",
                    width: isDesktop ? "50%" : "41%",
                    fontWeight: "bold",
                    backgroundColor: "rgb(234, 238,108)",

                    borderRadius: "10px",
                    ml: isDesktop ? null : 2.5,
                    mr: isDesktop ? null : 2,
                    "&:hover": {
                      backgroundColor: "rgb(234, 238,108)",
                    },
                  }}
                >
                  Ver mas
                </Button>
              </NextLink>
              <Button
                onClick={cartHandler}
                sx={{
                  marginLeft: isDesktop ? "12px" : null,
                  padding: "12px",
                  mr: isDesktop ? null : 2,
                  ml: isDesktop ? null : 2,
                  width: isDesktop ? "48%" : "41%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(234, 238,108)",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "rgb(234, 238,108)",
                  },
                }}
              >
                Comprar Ahora
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventoDestacado;
