import { Button, Typography } from "@mui/material";
import React from "react";
import banner from "../../utils/Images/banner.jpg";
const Banner = () => {
  return (
    <div position="relative" style={{ textAlign: "center", color: "white" }}>
      <img style={{ maxWidth: "100%", minHeight: "100vh" }} src={banner.src} />
      <Typography
        sx={{
          position: "absolute",
          color: "white",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "6rem",
          fontWeight: "900",
          lineHeight: "80px",
        }}
      >
        ¿QUE HAY PA ROMPER?
      </Typography>
      <Typography
        sx={{
          color: "white",
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
          fontWeight: "900",
        }}
      >
        SOMOS INPUT
      </Typography>
      <Button
        sx={{
          position: "absolute",
          top: "75%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "12px",
          width: "40%",
          fontWeight: "bold",
          backgroundColor: "#7EF56F",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#7EF56F",
          },
        }}
      >
        venta de boletas y control de acceso bien hechos
      </Button>
    </div>
  );
};

export default Banner;
