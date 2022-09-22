import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { useForm, Controller } from "react-hook-form";
import NextLink from "next/link";
import Form from "../components/Form";
import {
  Box,
  Button,
  Container,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { getError } from "../utils/error";
///////////////////////////////////////////////////////////////////////////////////

export default function RegisterScreen() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [router, userInfo, redirect]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
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
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <Layout title="Register">
      <Container>
        <Box sx={{ paddingBottom: isDesktop ? "90px" : "50px" }}>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: " coolvetica, sans-serif",
                fontSize: "2rem",
              }}
              component="h1"
              variant="h1"
            >
              Registrate
            </Typography>
            <List>
              <ListItem>
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
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Nombre"
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
              </ListItem>

              <ListItem>
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
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
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
              </ListItem>
              <ListItem>
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
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="Contraseña"
                      inputProps={{ type: "password" }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === "minLength"
                            ? "La contraseña debe tener mas de 5 caracteres"
                            : "Contraseña obligatoria"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="confirmPassword"
                      label="Confirma Contraseña"
                      inputProps={{ type: "password" }}
                      error={Boolean(errors.confirmPassword)}
                      helperText={
                        errors.confirmPassword
                          ? errors.confirmPassword.type === "minLength"
                            ? "La contraseña debe tener mas de 5 caracteres"
                            : "Confirmar contraseña obligatorio"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    paddingLeft: "10px",
                    backgroundColor: "black",
                    borderRadius: "0 ",
                    "&:hover": {
                      backgroundColor: "black",
                      transform: "scale(1, 1.1)",
                    },
                  }}
                >
                  Registrate
                </Button>
              </ListItem>
              <ListItem>
                Ya tienes una cuenta?
                <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
                  <Link
                    sx={{
                      paddingLeft: "10px",
                      color: "black",
                      "&:hover": { color: "black" },
                    }}
                  >
                    Inicia sesion
                  </Link>
                </NextLink>
              </ListItem>
            </List>
          </Form>
        </Box>
      </Container>
    </Layout>
  );
}
