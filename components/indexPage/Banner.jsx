import { Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
const Banner = () => {
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <Image
        src="/images/banner.jpg"
        alt="Banner"
        width="100vw"
        height={isDesktop ? "60vh" : "120vh"}
        sizes="80vh"
      />
      <Typography
        className="family-track"
        sx={{
          position: "absolute",
          color: "white",
          top: isDesktop ? "50%" : "35%",
          left: "18%",
          transform: "translate(-4%, -50%)",
          fontSize: isDesktop ? "5rem" : "2.8rem",
          fontWeight: "900",
          lineHeight: "1",
        }}
      >
        Ticketing Bien Hecho
      </Typography>
    </div>
  );
};

export default Banner;
