import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";

function Funciona() {
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ backgroundColor: "rgb(34,34,34)" }}
    >
      <Grid container sx={{ backgroundColor: "rgb(34,34,34)" }}>
        <Grid item md={12} justifyContent="center" display="flex">
          <Box sx={{}}>
            <Typography
              component="h1"
              variant="h1"
              sx={{ color: "white", fontSize: "3rem" }}
            >
              {" "}
              ¿Como Funciona?
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          md={12}
          justifyContent="center"
          display="flex"
          sx={{ width: "100%", mb: isDesktop ? 10 : 0 }}
        >
          <Typography
            component="text"
            variant="text"
            sx={{ color: "white", fontSize: "2rem" }}
          >
            {" "}
            Tres Simples Pasos
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            sx={{ width: "100%", height: "250px" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{
                backgroundColor: "rgb(25,25,25)",
                width: isDesktop ? "400px" : "100%",
                height: "300px",
                borderRadius: "15px",
                border: "1px solid white",
                mt: isDesktop ? 0 : 20,
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1213/1213206.png"
                style={{ height: "90px", width: "90px" }}
              />
              <Typography component="h1" variant="h1" sx={{ color: "white" }}>
                Registrate
              </Typography>
              <Typography
                component="text"
                variant="text"
                sx={{ color: "white", textAlign: "center", pr: 2, pl: 2 }}
              >
                Cuentanos quien eres y a donde debemos mandar tus boletas
              </Typography>
            </Box>
          </Box>
        </Grid>{" "}
        <Grid item md={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", height: "250px", mt: isDesktop ? 0 : 20 }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{
                backgroundColor: "rgb(25,25,25)",
                width: isDesktop ? "400px" : "100%",
                height: "300px",
                borderRadius: "15px",
                border: "1px solid white",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/432/432312.png"
                style={{ height: "90px", width: "90px" }}
              />
              <Typography component="h1" variant="h1" sx={{ color: "white" }}>
                Compra tu Entrada
              </Typography>
              <Typography
                component="text"
                variant="text"
                sx={{ color: "white", textAlign: "center", pr: 2, pl: 2 }}
              >
                Compra tus entradas con diferentes medios de pago
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            sx={{ width: "100%", height: "250px", mt: isDesktop ? 0 : 10 }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "rgb(25,25,25)",
                width: isDesktop ? "400px" : "100%",
                height: "300px",
                borderRadius: "15px",
                border: "1px solid white",
              }}
            >
              {" "}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3445/3445929.png"
                  style={{ height: "90px", width: "90px" }}
                />
                <Typography component="h1" variant="h1" sx={{ color: "white" }}>
                  Disfruta
                </Typography>
                <Typography
                  component="text"
                  variant="text"
                  sx={{ color: "white", textAlign: "center", pr: 2, pl: 2 }}
                >
                  Muestra el QR que te llegara al correo. Entra sin hacer fila
                  ni preocupaciones
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Funciona;
