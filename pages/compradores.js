import {
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  useMediaQuery,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import { Controller, useForm } from "react-hook-form";
const generos = ["Masculino", "Femenino", "Indefinido"];
const compradores = () => {
  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const { control, handleSubmit } = useForm();
  const isDesktop = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    console.log(cart);
  });
  const submitHandler = async ({ email1 }) => {
    console.log(email1);
  };
  return (
    // <Layout title="Information">
    <Grid container>
      {" "}
      <Grid
        item
        md="6"
        display="flex"
        justifyContent="start"
        flexDirection="column"
        sx={{ pl: 8, pr: 8, pt: 4, width: "100%" }}
      >
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h1"
            component="h1"
            sx={{ color: "white", fontWeight: "bold", fontSize: "8rem" }}
          >
            INPUT
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          sx={{
            color: "white",
            fontSize: "1.5rem",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Typography variant="text" sx={{}}>
            Informacion
          </Typography>
          <ArrowForwardIcon size="large" sx={{ opacity: 1 }} />
          <Typography variant="text" sx={{ opacity: 0.5 }}>
            Pago
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="start"
          sx={{ color: "white", fontWeight: "bold", mt: 4 }}
        >
          <Typography variant="h4" component="h1">
            Informacion de Envio
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="start"
          sx={{ color: "white", fontSize: "1.3rem", mb: 2, opacity: 0.5 }}
        >
          <Typography variant="text" component="text">
            ¿A donde quieres que enviemos tu boleta?
          </Typography>
        </Box>

        <form
          onSubmit={handleSubmit(submitHandler)}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {" "}
          <Typography
            variant="text"
            component="text"
            sx={{ color: "white", fontWeight: "bold" }}
          >
            Primera Boleta:
          </Typography>
          <Box display="flex" justifyContent="space-between">
            {" "}
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
                  sx={{ backgroundColor: "white", width: "48%" }}
                  variant="outlined"
                  fullWidth
                  id="name"
                  size="small"
                  label="Nombre y Apellido"
                  inputProps={{ type: "name" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
            <Controller
              name="cedula1"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ backgroundColor: "white", width: "48%" }}
                  variant="outlined"
                  fullWidth
                  id="cedula1"
                  size="small"
                  label="Cedula"
                  inputProps={{ type: "number" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Box>
          <Box display="flex" justifyContent="space-between">
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
                  sx={{ width: "48%", backgroundColor: "white" }}
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
              name="email1"
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
                  sx={{ backgroundColor: "white", width: "48%" }}
                  variant="outlined"
                  fullWidth
                  id="email1"
                  label="Correo Electronico"
                  inputProps={{ type: "email" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Box>
          <Box display="flex" justifyContent="end">
            {" "}
            <Button
              sx={{
                padding: "12px",
                width: isDesktop ? "50%" : "41%",
                fontWeight: "bold",
                backgroundColor: "rgb(234, 238,108)",
                color: "black",
                borderRadius: "10px",
                ml: isDesktop ? null : 2.5,
                mr: isDesktop ? null : 2,
                "&:hover": {
                  backgroundColor: "rgb(234, 238,108)",
                },
              }}
            >
              Continuar pago
            </Button>
          </Box>
        </form>
      </Grid>
      <Grid
        item
        md="6"
        sx={{ width: "100%", height: "100vh", background: "white" }}
      >
        Hola
      </Grid>
    </Grid>
    // </Layout>
  );
};

export default compradores;
