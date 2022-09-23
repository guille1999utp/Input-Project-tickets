import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import NextLink from "next/link";
function Funciona({ eventos }) {
  useEffect(() => {});
  const slug = eventos[0].slug.current;
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ backgroundColor: "rgb(34,34,34)" }}
    >
      <Grid container sx={{ backgroundColor: "rgb(34,34,34)" }}>
        <Grid item md={12} justifyContent="center" display="flex">
          <Box>
            <NextLink href={`/eventos/${slug}`} passHref>
              <Typography component="h1" variant="h1" sx={{ color: "white" }}>
                {" "}
                ¿Como Funciona?
              </Typography>
            </NextLink>
          </Box>
        </Grid>
        <Grid item md={12} justifyContent="center" display="flex">
          <Box>
            <Typography component="text" variant="text" sx={{ color: "white" }}>
              {" "}
              Es lo mas sencillo del mundo
            </Typography>
          </Box>
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
                width: "300px",
                height: "200px",
                borderRadius: "15px",
                border: "1px solid white",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1213/1213206.png"
                style={{ height: "70px", width: "70px" }}
              />
              <Typography component="h1" variant="h1" sx={{ color: "white" }}>
                Registrate
              </Typography>
              <Typography
                component="text"
                variant="text"
                sx={{ color: "white", textAlign: "center" }}
              >
                Cuentanos quien eres y a donde debemos mandar tus boletas
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", height: "250px" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "rgb(25,25,25)",
                width: "300px",
                height: "200px",
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
                sx={{
                  backgroundColor: "rgb(25,25,25)",
                  width: "300px",
                  height: "200px",
                  borderRadius: "15px",
                  border: "1px solid white",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/432/432312.png"
                  style={{ height: "70px", width: "70px" }}
                />
                <Typography component="h1" variant="h1" sx={{ color: "white" }}>
                  Compra tu Entrada
                </Typography>
                <Typography
                  component="text"
                  variant="text"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Compra las entradas,
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            sx={{ width: "100%", height: "250px" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "rgb(25,25,25)",
                width: "300px",
                height: "200px",
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
                sx={{
                  backgroundColor: "rgb(25,25,25)",
                  width: "300px",
                  height: "200px",
                  borderRadius: "15px",
                  border: "1px solid white",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3445/3445929.png"
                  style={{ height: "70px", width: "70px" }}
                />
                <Typography component="h1" variant="h1" sx={{ color: "white" }}>
                  Registrate
                </Typography>
                <Typography
                  component="text"
                  variant="text"
                  sx={{ color: "white", textAlign: "center" }}
                >
                  Cuentanos quien eres y a donde debemos mandar tus boletas
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
