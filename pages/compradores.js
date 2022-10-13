import {
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  useMediaQuery,
  Button,
  Divider,
} from "@mui/material";
import { urlFor, urlForThumbnail } from "../utils/image";
import { useSnackbar } from "notistack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import { Controller, useForm } from "react-hook-form";
import { CaptUsuario } from "../components/captUsuario";
import { useRouter } from "next/router";
import axios from "axios";
const generos = ["Masculino", "Femenino", "Indefinido"];
const compradores = () => {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const { control, handleSubmit } = useForm();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!userInfo) {
      return router.push("/?redirect=/compradores");
    }
  }, []);
  const submitHandler = async ({
    name3,
    name2,
    name1,
    cedula1,
    cedula2,
    cedula3,
    genero1,
    genero2,
    genero3,
    email1,
    email2,
    email3,
  }) => {
    let users = [];
    console.log();
    if (cart.quantity > 2) {
      users.push({
        name: name3,
        genero: genero3,
        correo: email3,
        cedula: cedula3,
      });
    }
    if (cart.quantity > 1) {
      users.push({
        name: name2,
        genero: genero2,
        correo: email2,
        cedula: cedula2,
      });
    }
    if (cart.quantity > 0) {
      users.push({
        name: name1,
        genero: genero1,
        correo: email1,
        cedula: cedula1,
      });
    }
    const compradores = async () => {
      try {
        const response = await axios.post("/api/compradores", { users });
        console.log(response);
      } catch (err) {
        console.log(err.response);
        enqueueSnackbar(" ", {
          variant: "error",
        });
      }
    };
    compradores();
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
          <Box>
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
                name="name1"
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
                    id="name1"
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
                name="genero1"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    margin="normal"
                    id="genero1"
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
          </Box>
          <Box>
            {cart.quantity > 1 ? (
              <CaptUsuario
                quantity={cart.quantity}
                index={2}
                control={control}
              />
            ) : null}
            {cart.quantity > 2 ? (
              <CaptUsuario
                quantity={cart.quantity}
                index={3}
                control={control}
              />
            ) : null}
          </Box>

          <Box display="flex" justifyContent="end">
            <Button
              type="submit"
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
        sx={{
          width: "100%",
          height: "100vh",
          background: "white",
          pl: 8,
          pr: 8,
          pt: 6,
        }}
      >
        <Box>
          <Typography variant="h5" component="h5">
            {cart.name}
          </Typography>
          <Typography variant="text" component="text">
            {cart.quantity} Boletas
          </Typography>
          <Box>
            <input />
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography>Subtotal</Typography>
            </Box>
            <Box>
              <Typography>{cart.quantity * cart.price}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography>Total</Typography>
            </Box>
            <Box>
              <Typography>{cart.quantity * cart.price}</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </Layout>
  );
};

export default compradores;
