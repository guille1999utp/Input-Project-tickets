import { createTheme } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";

import jsCookie from "js-cookie";
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

import Head from "next/head";

import classes from "../utils/classes";
import { useContext, useEffect, useState } from "react";

import { useSnackbar } from "notistack";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
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
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openLogin, setOpenLogin] = useState(false);

  const handleClickOpenLogin = () => {
    setOpen(false);
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();

  const submitLoginHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      jsCookie.set("userInfo", JSON.stringify(data));
      handleCloseLogin();

      console.log(userInfo);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
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
      enqueueSnackbar("Usuario Registrado", { variant: "success" });
      handleClose();
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const logoutClickHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
  };
  const [isUserInfo, setisUserInfo] = useState([userInfo]);

  useEffect(() => {
    setisUserInfo(userInfo);
  }, [userInfo]);

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
            <Toolbar
              sx={{
                justifyContent: "end",
                backgroundColor: "black",
                alignItems: "center",
                height: "90px",
              }}
              display="flex"
              className="layout"
            >
              <Box sx={{ color: "white" }}>
                <Typography
                  className="inputTitle"
                  sx={{ color: "white", fontSize: "3rem" }}
                  variant="h1"
                  component="a"
                  href="/"
                >
                  Input
                </Typography>
              </Box>
              <Box display="flex">
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    display: isUserInfo ? "none" : null,
                    fontWeight: "bold",
                    padding: "9px",
                    marginRight: isDesktop ? "20px" : 0.5,
                    backgroundColor: "rgb(234, 238,108)",
                    borderRadius: "60px",
                    fontSize: isDesktop ? null : ".6rem",
                    "&:hover": {
                      backgroundColor: "rgb(234, 238,108)",
                    },
                  }}
                >
                  Crear Cuenta
                </Button>
                <Button
                  onClick={handleClickOpenLogin}
                  sx={{
                    display: isUserInfo ? "none" : null,
                    padding: "9px",
                    fontWeight: "bold",
                    backgroundColor: "rgb(234, 238,108)",
                    borderRadius: "40px",
                    fontSize: isDesktop ? null : ".6rem",
                    "&:hover": {
                      backgroundColor: "rgb(234, 238,108)",
                    },
                  }}
                >
                  Iniciar Sesion
                </Button>
                <Box display="flex">
                  {" "}
                  <h1
                    style={{
                      padding: "9px",
                      display: isUserInfo ? null : "none",
                    }}
                  >
                    {" "}
                    {userInfo?.name}{" "}
                    <Button
                      onClick={logoutClickHandler}
                      sx={{
                        display: isUserInfo ? null : "none",
                        padding: "6px",
                        width: "100px",
                        margin: "10px",
                        fontWeight: "bold",
                        backgroundColor: "rgb(234, 238,108)",
                        borderRadius: "40px",
                        "&:hover": {
                          backgroundColor: "rgb(234, 238,108)",
                        },
                      }}
                    >
                      LogOut
                    </Button>
                  </h1>
                </Box>

                <Dialog
                  sx={{ backgroundColor: "black" }}
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
                    <Form
                      onSubmit={handleSubmit(submitHandler)}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
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
                        Al dar click en Crear Cuenta aceptas nuestros terminos y
                        condiciones y politicas de tratamiento de datos
                      </Typography>
                      <Button
                        onClick={() => {
                          handleClickOpenLogin;
                        }}
                        sx={{
                          padding: "12px",
                          width: isDesktop ? "40%" : "100%",
                          fontWeight: "bold",
                          margin: "10px auto",
                          backgroundColor: " rgb(234, 238,108)",
                          borderRadius: "10px",
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
                <Dialog
                  sx={{ backgroundColor: "black" }}
                  open={openLogin}
                  onClose={handleCloseLogin}
                  className="dialog"
                >
                  <DialogTitle
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.8rem",
                    }}
                  >
                    Inicia Sesion
                  </DialogTitle>

                  <DialogContent>
                    <Form
                      onSubmit={handleSubmit(submitLoginHandler)}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
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
                            sx={{ backgroundColor: "white", width: "100%" }}
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
                      <Button
                        type="submit"
                        sx={{
                          padding: "12px",
                          width: "100%",
                          fontWeight: "bold",
                          backgroundColor: "#7EF56F",
                          borderRadius: "10px",
                          margin: "10px auto 3px",
                          "&:hover": {
                            backgroundColor: "#7EF56F",
                          },
                        }}
                      >
                        Iniciar Sesion
                      </Button>
                      <Button
                        onClick={handleClose}
                        sx={{
                          padding: "12px",
                          width: "100%",
                          fontWeight: "bold",
                          margin: "10px auto",
                          backgroundColor: " rgb(234, 238,108)",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: " rgb(234, 238,108)",
                          },
                        }}
                      >
                        Crear Cuenta
                      </Button>{" "}
                      <Typography
                        sx={{ fontSize: ".7rem", marginRight: "5px" }}
                      >
                        Al dar click en Crear Cuenta aceptas nuestros terminos y
                        condiciones y politicas de tratamiento de datos
                      </Typography>
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
            sx={{ mt: 30 }}
          ></Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
