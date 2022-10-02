import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { urlFor } from "../../utils/image";

const eventoDestacado = ({ eventos }) => {
  return (
    <Box
      display="flex"
      sx={{ width: "100%", backgroundColor: "rgb(34,34,34)" }}
    >
      <Grid container padding={4} spacing={6}>
        <Grid item md={4} display="flex" className="gridCenter">
          <img height="400px" width="400px" src={urlFor(eventos[0].image[0])} />
        </Grid>
        <Grid item md={8} display="flex" className="gridSpace">
          <Box sx={{ width: "100%" }}>
            <Box display="flex" sx={{ color: "white" }}>
              {eventos[0].categoria} {eventos[0].ciudad}
              {eventos[0].lugar}
            </Box>
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
