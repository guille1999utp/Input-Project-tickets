import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Dialog,
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
import jsCookie from "js-cookie";
import Head from "next/head";

import classes from "../utils/classes";
import { useState } from "react";

import { useSnackbar } from "notistack";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { getError } from "../utils/error";
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

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();
  const submitHandler = async ({
    tipoDocumento,
    name,
    documento,
    celular,
    fecha,
    genero,
    email,
    confirmarEmail,
    password,
    confirmarContraseña,
  }) => {
    if (password !== confirmarContraseña) {
      enqueueSnackbar("Las Contraseñas son diferentes", { variant: "error" });
      return;
    }
    if (email !== confirmarEmail) {
      enqueueSnackbar("Los Correos son Diferentes", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        tipoDocumento,
        name,
        documento,
        celular,
        fecha,
        genero,
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
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
                    <Form onSubmit={handleSubmit(submitHandler)}>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                          <TextField
                            sx={{ backgroundColor: "white" }}
                            variant="outlined"
                            fullWidth
                            id="name"
                            size="small"
                            label="Nombre y Apellido"
                            inputProps={{ type: "name" }}
                            error={Boolean(errors.name)}
                            helperText={
                              errors.name
                                ? errors.name.type === "minLength"
                                  ? "Nombre debe tener mas de un caracter"
                                  : "Nombre es obligatorio"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                      <Box display="flex" justifyContent="space-between">
                        <Controller
                          name="tipoDocumento"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              margin="normal"
                              id="tipoDocumento"
                              select
                              label="Tipo documento"
                              sx={{ width: "50%", backgroundColor: "white" }}
                              {...field}
                            >
                              {documentos.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        ></Controller>
                        <Controller
                          name="documento"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              variant="outlined"
                              size="small"
                              sx={{ width: "48%", backgroundColor: "white" }}
                              id="documento"
                              label="Numero de documento "
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </Box>
                      <Controller
                        name="celular"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            size="small"
                            variant="outlined"
                            sx={{ backgroundColor: "white", width: "100%" }}
                            id="celular"
                            label="Celular"
                            inputProps={{ type: "number" }}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Controller
                          name="genero"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              size="small"
                              margin="normal"
                              id="genero"
                              select
                              label="Genero"
                              sx={{ width: "50%", backgroundColor: "white" }}
                              {...field}
                            >
                              {generos.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        ></Controller>
                        <Controller
                          name="fecha"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              variant="outlined"
                              size="small"
                              sx={{ width: "48%", backgroundColor: "white" }}
                              id="fecha"
                              label="Fecha de nacimiento"
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </Box>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            size="small"
                            sx={{ backgroundColor: "white" }}
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Correo Electronico"
                            inputProps={{ type: "email" }}
                            error={Boolean(errors.email)}
                            helperText={
                              errors.email
                                ? errors.email.type === "pattern"
                                  ? "El email no es valido"
                                  : "El email es obligatorio"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                      <Controller
                        name="confirmarEmail"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            margin="normal"
                            size="small"
                            sx={{ backgroundColor: "white" }}
                            variant="outlined"
                            fullWidth
                            id="confirmarEmail"
                            label="Confirmar Correo Electronico"
                            inputProps={{ type: "email" }}
                            error={Boolean(errors.email)}
                            helperText={
                              errors.email
                                ? errors.email.type === "pattern"
                                  ? "El email no es valido"
                                  : "El email es obligatorio"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                      <DialogContentText
                        sx={{ color: "white", textAlign: "center" }}
                      >
                        Confirma que este es tu correo electronico, aca seran
                        enviadas tus entradas
                      </DialogContentText>
                      <Box display="flex" justifyContent="space-between">
                        <Controller
                          name="password"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            minLength: 6,
                          }}
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              size="small"
                              sx={{ backgroundColor: "white", width: "50%" }}
                              variant="outlined"
                              fullWidth
                              id="password"
                              label="Contraseña"
                              inputProps={{ type: "password" }}
                              error={Boolean(errors.password)}
                              helperText={
                                errors.contraseña
                                  ? errors.contraseña.type === "minLength"
                                    ? "La contraseña debe tener mas de 5 caracteres"
                                    : "Contraseña obligatoria"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                        <Controller
                          name="confirmarContraseña"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            minLength: 6,
                          }}
                          render={({ field }) => (
                            <TextField
                              margin="normal"
                              size="small"
                              sx={{ backgroundColor: "white", width: "48%" }}
                              variant="outlined"
                              fullWidth
                              id="confirmarContraseña"
                              label="Confirmar Contraseña"
                              inputProps={{ type: "password" }}
                              error={Boolean(errors.confirmPassword)}
                              helperText={
                                errors.confirmarContraseña
                                  ? errors.confirmarContraseña.type ===
                                    "minLength"
                                    ? "La contraseña debe tener mas de 5 caracteres"
                                    : "Confirmar contraseña obligatorio"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </Box>{" "}
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
                        type="submit"
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
                      <Typography
                        sx={{ fontSize: ".7rem", marginRight: "5px" }}
                      >
                        Al dar click en "Crear Cuenta" aceptas nuestros terminos
                        y condiciones y politicas de tratamiento de datos
                      </Typography>
                      <Button
                        onClick={handleClose}
                        sx={{
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
                    </Form>
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
