import { Button, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import ImageBanner from "../../utils/Images/banner.jpg";
const Banner = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <div position="relative" style={{ textAlign: "center", color: "white" }}>
      <Image  
        src={ImageBanner}
        alt="Banner"
        sizes="80vh"
        
        />
      <Typography
        sx={{
          position: "absolute",
          color: "white",
          top: isDesktop ? "50%" : "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: isDesktop ? "6rem" : "4rem",
          fontWeight: "900",
          lineHeight: "1",
        }}
      >
        ¿QUE HAY PA ROMPER?
      </Typography>
      <Typography
        sx={{
          color: "white",
          position: "absolute",
          top: isDesktop ? "66%" : "65%",
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
          top: isDesktop ? "75%" : "85%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "12px",
          width: isDesktop ? "40%" : "80%",
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
