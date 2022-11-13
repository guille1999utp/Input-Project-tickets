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
import { useSnackbar } from "notistack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import { Controller, useForm } from "react-hook-form";
import { CaptUsuario } from "../components/captUsuario";
import { useRouter } from "next/router";
import axios from "axios";
import Product from "../components/MercadoPago";
import classes from "../utils/classes";
import jsCookie from "js-cookie";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4OWQ1ODRmOC1mZDhiLTQyZjktYmQ5MS1iYWM3YTgxN2I3YzMiLCJuYW1lIjoiZGFuaSIsImVtYWlsIjoiZGFuaWVsLnJ1c3NpMTIxNUBob3RtYWlsLmNvbSIsInJvbCI6IkFkbWluIiwiaWF0IjoxNjY3OTM0MjAxLCJleHAiOjE2NzA1MjYyMDF9.92NIh1a3RB89jnejIbiVkOGz9_OK7etDE6Iz8s1fgV4";

const generos = ["Masculino", "Femenino", "Indefinido"];
const identificacion = ["Emprendedor", "Mentor", "Inversionista", "Aliado"];
const Compradores = () => {
  const staff = jsCookie.get("staff");
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const { enqueueSnackbar } = useSnackbar();
  const [localState, setlocalState] = useState({
    image: [],
  });
  const [nombres, setnombres] = useState([]);

  const [data, setGlobal] = useState({});
  useEffect(() => {
    // if (!userInfo) {
    //   return router.push("/?redirect=/compradores");
    // }
    setlocalState(cart.image);
  }, [router, userInfo, cart.image]);

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
    edad,
    identificacion,
    empresa,
  }) => {
    let users = [];
    if (cart.quantity > 2) {
      users.push({
        name: name3,
        genero: genero3,
        correo: email3,
        cedula: cedula3,
      });
      setnombres([...nombres, name3]);
    }
    if (cart.quantity > 1) {
      users.push({
        name: name2,
        genero: genero2,
        correo: email2,
        cedula: cedula2,
      });
      setnombres([...nombres, name2]);
    }
    if (cart.quantity >= 0) {
      users.push({
        name: name1,
        genero: genero1,
        correo: email1,
        cedula: cedula1,
        edad,
        identificacion,
        empresa,
      });
      console.log(users);
      setnombres([...nombres, name1]);
    }
    reset({ edad: "", identificacion: "", empresa: "" });
    const compradores = async () => {
      try {
        console.log("entro");
        const response = await axios.post(
          "/api/products/generateQR",
          { users, evento: cart._key, quantity: cart.quantity || 1, staff },
          { headers: { authorization: `${token}` } }
        );
        enqueueSnackbar("Boleta enviada exitosamente revisa tu correo", {
          variant: "success",
        });
        console.log(response);
        if (response.data.global === "isFree") {
          return router.push("/");
        }
        setGlobal(response.data);
      } catch (err) {
        console.log(err);
        enqueueSnackbar(err.response, {
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
            Informacion de entradas
          </Typography>
        </Box>
        <Box
          display="flex"
          sx={{ color: "white", fontSize: "1.3rem", mb: 2, opacity: 0.5 }}
        >
          <Typography variant="text" component="text">
            ¿Quienes seran las personas que usaran las boletas?
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(submitHandler)}>
          <Box>
            <Typography
              variant="text"
              component="text"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Boleta:
            </Typography>
            <Box display="flex" mb={2}>
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
                    sx={{ backgroundColor: "white", width: "100%" }}
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
            </Box>
            <Box display="flex" justifyContent="space-between">
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
              <Controller
                name="edad"
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
                    id="edad"
                    size="small"
                    label="Edad"
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
                  pattern: /^[a-z0-9._%+-]+@/,
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
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === "pattern"
                          ? "El email no es valido"
                          : "El email es obligatorio"
                        : ""
                    }
                  ></TextField>
                )}
              ></Controller>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Controller
                name="identificacion"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    margin="normal"
                    id="identificacion"
                    select
                    label="Como te identificas"
                    sx={{ width: "48%", backgroundColor: "white" }}
                    {...field}
                  >
                    {identificacion.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              ></Controller>
              <Controller
                name="empresa"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    margin="normal"
                    id="empresa"
                    label="Empresa"
                    sx={{ width: "48%", backgroundColor: "white" }}
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
            ) : null}{" "}
          </Box>

          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              onClick={() => {}}
              sx={{
                mt: 2,
                padding: "12px",
                width: isDesktop ? "50%" : "41%",
                fontWeight: "bold",
                backgroundColor: "#7EF56F",
                color: "black",
                borderRadius: "10px",
                ml: isDesktop ? null : 2.5,
                mr: isDesktop ? null : 2,
                "&:hover": {
                  backgroundColor: "#7EF56F",
                },
              }}
            >
              {cart.price !== 0 ? "Continuar pago" : "Enviar Boleta"}
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
        <Box justifyContent="start" flexDirection="column">
          <Box display="flex" justifyContent="start" mb={2}>
            <img src={localState} height="90px" alt={cart.name} />
            <Box ml={4}>
              <Typography
                variant="h5"
                component="h5"
                sx={{ fontWeight: "bold", fontSize: "1.8rem" }}
              >
                {cart.name}
              </Typography>
              <Typography
                variant="text"
                component="text"
                sx={{ fontWeight: "bold", fontSize: "1.2rem", opacity: 0.5 }}
              >
                {cart.quantity} Boletas
              </Typography>
            </Box>
          </Box>

          <Box>
            {/* <Controller
              name="codigo"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  sx={{ backgroundColor: "white", width: "80%", opacity: 0.5 }}
                  variant="outlined"
                  fullWidth
                  id="codigo"
                  size="small"
                  label="Codigo Promotor"
                  inputProps={{ type: "name" }}
                  {...field}
                ></TextField>
              )}
            ></Controller> */}
            {cart.price ? (
              <Button
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  width: "20%",
                  backgroundColor: "#7EF56F",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#7EF56F",
                  },
                }}
              >
                Usar
              </Button>
            ) : null}
          </Box>
          <Divider
            sx={{
              mt: 2,
              opacity: 1,
              borderColor: "black !important",
              fontWeight: "bold",
            }}
          />
          <Box mt={1}>
            {nombres.map((users) => (
              <Box key={users} display="flex" justifyContent="space-between">
                <Box>
                  <Typography
                    sx={{ fontSize: "1.4rem" }}
                  >{`Boleta-${users}`}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "1.4rem", opacity: 0.5 }}>
                    {"$" + new Intl.NumberFormat().format(parseInt(cart.price))}{" "}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider
            sx={{
              mt: 2,
              opacity: 1,
              borderColor: "black !important",
              fontWeight: "bold",
            }}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                Total
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: "1.4rem" }}>
                {"$" +
                  new Intl.NumberFormat().format(
                    parseInt(cart.quantity * cart.price)
                  )}{" "}
              </Typography>
            </Box>
          </Box>
          <Box sx={classes.fullWidth}>
            {data?.global ? <Product id={data?.global} /> : null}
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </Layout>
  );
};

export default Compradores;
