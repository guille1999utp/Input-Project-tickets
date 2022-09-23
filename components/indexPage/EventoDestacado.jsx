import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { urlFor } from "../../utils/image";

const eventoDestacado = ({ eventos }) => {
  useEffect(() => {
    console.log(eventos.image);
    console.log(urlFor(eventos[0].image[0]));
  }, []);

  return (
    <Box
      display="flex"
      sx={{ width: "100%", backgroundColor: "rgb(34,34,34)" }}
    >
      <Grid container padding={4} spacing={6}>
        <Grid item md={6} display="flex" className="gridCenter">
          <img height="500px" width="500px" src={urlFor(eventos[0].image[0])} />
        </Grid>
        <Grid item md={6} display="flex" className="gridSpace">
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {eventos[0].nombre}
            </Typography>
            <Box>
              {" "}
              <Typography
                variant="text"
                component="text"
                sx={{ color: "white" }}
              >
                Ciudad: {eventos[0].ciudad}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography
                variant="text"
                component="text"
                sx={{ lineHeight: "55px", color: "white" }}
              >
                Fecha: {eventos[0].fecha}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography
                variant="text"
                component="text"
                sx={{ lineHeight: "45px", color: "white" }}
              >
                Categoria: {eventos[0].categoria}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography
                variant="text"
                component="text"
                sx={{ lineHeight: "45px", color: "white" }}
              >
                Hora de inicio {eventos[0].hora}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography
                variant="text"
                component="text"
                sx={{ lineHeight: "45px", color: "white" }}
              >
                Lugar: {eventos[0].lugar}
              </Typography>
            </Box>
            <Box>
              {" "}
              <Typography
                variant="text"
                component="text"
                sx={{ lineHeight: "45px", color: "white" }}
              >
                Precio: {eventos[0].precio}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%", alignSelf: "end" }}>
            <Button
              sx={{
                padding: "12px",
                width: "40%",
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
            <Button
              sx={{
                marginLeft: "12px",
                padding: "12px",
                width: "40%",
                fontWeight: "bold",
                backgroundColor: "rgb(234, 238,108)",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "rgb(234, 238,108)",
                },
              }}
            >
              Compartir evento
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default eventoDestacado;
