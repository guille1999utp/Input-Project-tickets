import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from "./PopUp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Head from "next/head";

import classes from "../utils/classes";
import { useState } from "react";

import { useSnackbar } from "notistack";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

////////////////////////////////////////////////////////////////
export default function Layout({ title, description, children }) {
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Head>
        <title>{title ? `${title} - Input` : "Input"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <AppBar position="static" sx={classes.appbar}>
            <Toolbar sx={classes.toolbar} display="flex" className="layout">
              <Box>Input</Box>
              <Box>
                {" "}
                <Button
                  sx={{
                    fontWeight: "bold",
                    padding: "9px",
                    marginRight: "20px",
                    backgroundColor: "rgb(234, 238,108)",
                    borderRadius: "60px",
                    "&:hover": {
                      backgroundColor: "rgb(234, 238,108)",
                    },
                  }}
                >
                  Crear Cuenta
                </Button>
                <Button
                  sx={{
                    padding: "9px",
                    fontWeight: "bold",
                    backgroundColor: "rgb(234, 238,108)",
                    borderRadius: "40px",
                    "&:hover": {
                      backgroundColor: "rgb(234, 238,108)",
                    },
                  }}
                >
                  Iniciar Sesion
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          <Container
            disableGutters={true}
            component="main"
            maxWidth="false"
            sx={classes.main}
          >
            {children}
          </Container>
          <Divider sx={{ color: "black", opacity: "1" }} />
          <Box
            display="flex"
            justifyContent={"space-between"}
            component="footer"
            sx={{
              paddingRight: isDesktop ? "50px" : "30px",
              marginLeft: isDesktop ? "50px" : "30px",

              marginTop: 5,
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            <Box>
              <Box>
                <Typography align="justify">All rights reserved. </Typography>
              </Box>
              <Box>
                <Typography align="justify"> Nuddy minds.</Typography>
              </Box>
            </Box>
            <Box>
              <Box display="flex" sx={{ justifyContent: "space-around" }}>
                <WhatsAppIcon fontSize="large" sx={{ marginLeft: "20px" }} />
                <InstagramIcon fontSize="large" sx={{ marginLeft: "20px" }} />
                <MailOutlineIcon fontSize="large" sx={{ marginLeft: "20px" }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
