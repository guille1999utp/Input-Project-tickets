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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { urlFor } from "../../utils/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";

const EventoDestacado = ({ eventos }) => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  const { control } = useForm();
  return (
    <Box
      display="flex"
      sx={{ width: "100%", backgroundColor: "rgb(34,34,34)" }}
    >
      <Grid container spacing={6}>
        <Grid item md={4} display="flex" className="gridCenter">
          <img height="400px" width="400px" src={urlFor(eventos[0].image[0])} />
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
                {eventos[0].categoria}
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
                {eventos[0].ciudad}
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
                {eventos[0].lugar}
              </Typography>
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "2.2rem",
                mt: 0,
              }}
            >
              {eventos[0].nombre}
            </Typography>
            <Box
              sx={{ backgroundColor: "yellow ", width: "28%", borderRadius: 5 }}
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
                Evento destacado #1
              </Typography>
            </Box>{" "}
            <Box
              sx={{ width: "100%", mt: 3 }}
              display="flex"
              justifyContent="space-around"
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "1.3rem",
                  ml: 20,
                  opacity: ".4",
                }}
              >
                Selecione la localidad
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  ml: isDesktop ? 19 : 0,
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
                    size="small"
                    margin="normal"
                    id="localidad"
                    select
                    label="Localidad"
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
                          {" "}
                          {option}
                        </Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              ></Controller>
              <Controller
                name="cantidad"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    margin="normal"
                    id=" cantidad"
                    select
                    label="Cantidad"
                    sx={{
                      width: "23%",
                      backgroundColor: "white",
                      mt: 0.5,
                      mb: 0.5,
                    }}
                    {...field}
                  >
                    {["1", "2", "3"].map((option) => (
                      <MenuItem key={option} value={option}>
                        <Typography sx={{ textAlign: "center" }}>
                          {" "}
                          {option}
                        </Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              ></Controller>{" "}
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
                    fontSize: "1.3rem",
                    color: "whitesmoke",
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
                  220,000
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

          <Box sx={{ width: "100%", alignSelf: "end" }}>
            <NextLink
              className="link"
              href={`/eventos/${eventos[0].slug.current}`}
              passHref
            >
              <Button
                sx={{
                  padding: "12px",
                  width: "50%",
                  fontWeight: "bold",
                  backgroundColor: "rgb(234, 238,108)",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "rgb(234, 238,108)",
                  },
                }}
              >
                Ver mas Informacion
              </Button>
            </NextLink>

            <Button
              sx={{
                marginLeft: "12px",
                padding: "12px",
                width: "48%",
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventoDestacado;
