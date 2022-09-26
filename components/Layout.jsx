import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
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
const documentos = ["CC", "Tarejeta de Identidad", "Cedula de Extranjeria"];
const generos = ["Masculino", "Femenino", "Indefinido"];
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [documento, setdocumento] = useState("");
  const [genero, setGenero] = useState("");
  const [label, setlabel] = useState(true);
  const handleChangeDocumento = (event) => {
    setdocumento(event.target.value);
  };
  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
  };
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
              <Box sx={{ color: "white" }}>
                <Typography
                  className="inputTitle"
                  sx={{ color: "white" }}
                  variant="h1"
                  component="a"
                  href="/"
                >
                  Input
                </Typography>
              </Box>
              <Box>
                {" "}
                <Button
                  onClick={handleClickOpen}
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
                <Dialog
                  sx={{ backgroundColor: "black", height: "100vh" }}
                  open={open}
                  onClose={handleClose}
                  className="dialog"
                >
                  <DialogTitle
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.8rem",
                    }}
                  >
                    Crea Tu Cuenta
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="normal"
                      fullWidth
                      size="small"
                      label="Nombres y Apellido"
                      sx={{ backgroundColor: "white" }}
                    />
                    <Box display="flex" justifyContent="space-between">
                      <TextField
                        margin="normal"
                        id="outlined-select-currency"
                        select
                        label="Tipo de Documento"
                        value={documento}
                        onChange={handleChangeDocumento}
                        size="small"
                        sx={{ width: "50%", backgroundColor: "white" }}
                      >
                        {documentos.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        margin="normal"
                        size="small"
                        label="Numero de Documento"
                        sx={{ backgroundColor: "white", width: "48%" }}
                      />
                    </Box>
                    <TextField
                      margin="normal"
                      fullWidth
                      size="small"
                      label="Numero De Celular"
                      sx={{ backgroundColor: "white" }}
                    />
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextField
                        margin="normal"
                        id="outlined-select-currency"
                        select
                        label="Genero"
                        value={genero}
                        onChange={handleChangeGenero}
                        size="small"
                        sx={{ width: "50%", backgroundColor: "white" }}
                      >
                        {generos.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        margin="normal"
                        size="small"
                        label="Fecha de nacimiento"
                        sx={{ backgroundColor: "white", width: "48%" }}
                      />
                    </Box>
                    <TextField
                      margin="normal"
                      fullWidth
                      size="small"
                      label="Correo Electronico"
                      sx={{ backgroundColor: "white" }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      size="small"
                      label="Confirmacion de Correo Electronico"
                      sx={{ backgroundColor: "white" }}
                    />
                    <DialogContentText
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      Confirma que este es tu correo electronico, aca seran
                      enviadas tus entradas
                    </DialogContentText>
                    <Box display="flex" justifyContent="space-between">
                      <TextField
                        margin="normal"
                        size="small"
                        label="Nombres y Apellido"
                        sx={{ width: "50%", backgroundColor: "white" }}
                      />{" "}
                      <TextField
                        margin="normal"
                        fullWidth
                        size="small"
                        label="Nombres y Apellido"
                        sx={{ width: "48%", backgroundColor: "white" }}
                      />{" "}
                    </Box>
                    <Typography sx={{ fontSize: ".9rem" }}>
                      <Checkbox
                        sx={{
                          color: "white",
                          paddingLeft: "0",
                          paddingRight: "0",
                        }}
                      />{" "}
                      Acepto los terminos y condiciones
                    </Typography>
                    <Button
                      onClick={handleClose}
                      sx={{
                        padding: "12px",
                        width: "100%",
                        fontWeight: "bold",
                        backgroundColor: "#7EF56F",
                        borderRadius: "10px",
                        margin: "5px",
                        "&:hover": {
                          backgroundColor: "#7EF56F",
                        },
                      }}
                    >
                      Crear Cuenta
                    </Button>
                    <Typography sx={{ fontSize: ".7rem", marginRight: "5px" }}>
                      Al dar click en "Crear Cuenta" aceptas nuestros terminos y
                      condiciones y politicas de tratamiento de datos
                    </Typography>
                    <Button
                      onClick={handleClose}
                      sx={{
                        position: "relative",
                        left: "50%",
                        top: "5%",
                        transform: "translate(-50%, -50%)",
                        alignItems: "center",
                        padding: "12px",
                        width: "40%",
                        fontWeight: "bold",

                        backgroundColor: " rgb(234, 238,108)",
                        borderRadius: "10px",
                        margin: "5px",
                        "&:hover": {
                          backgroundColor: " rgb(234, 238,108)",
                        },
                      }}
                    >
                      Ya tengo una cuenta
                    </Button>
                  </DialogContent>
                </Dialog>
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
