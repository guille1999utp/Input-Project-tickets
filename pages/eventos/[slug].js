import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Container,
  //
} from "@mui/material";
import Image from "next/image";
import { urlForThumbnail } from "../../utils/image";
import { useContext, useEffect, useState } from "react";

import input1 from "../../utils/Images/patrocinadores/input1.png";

import Layout from "../../components/Layout";
import client from "../../utils/client";
import { urlFor } from "../../utils/image";
import { Store } from "../../utils/Store";

import { useRouter } from "next/router";

export default function ProductScreen(props) {
  const router = useRouter();
  const { slug } = props;
  const { dispatch } = useContext(Store);
  // const { enqueueSnackbar } = useSnackbar();
  const [stateLocal, setState] = useState({
    eventos: null,
    loading: true,
    error: "",
  });
  console.log(slug);

  const { eventos, loading, error } = stateLocal;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventos = await client.fetch(
          `
            *[_type == "eventos" && slug.current == $slug][0]`,
          { slug }
        );
        console.log(eventos);

        setState({ eventos, loading: false });
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };
    fetchData();
  }, [slug]);
  const cartHandler = () => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: eventos._id,
        name: eventos.nombre,
        slug: eventos.slug.current,
        price: eventos.precio,
        image: urlForThumbnail(eventos.image && eventos.image[0]),
        quantity: 1,
      },
    });
    router.push("/compradores");
  };
  return (
    <Layout title={eventos?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box
            display="flex"
            sx={{ width: "100%", backgroundColor: "rgb(34,34,34)" }}
          >
            <Grid container padding={4} spacing={6}>
              <Grid item md={6} display="flex" className="gridCenter">
                <Image
                  height="450px"
                  width="550px"
                  alt="image Slug"
                  src={urlFor(eventos.image[0])}
                />
              </Grid>
              <Grid item md={6} display="flex" className="gridSpace">
                <Box sx={{ width: "100%" }}>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {eventos.nombre}
                  </Typography>
                  <Box>
                    {" "}
                    <Typography
                      variant="text"
                      component="text"
                      sx={{ color: "white" }}
                    >
                      Ciudad: {eventos.ciudad}
                    </Typography>
                  </Box>
                  <Box>
                    {" "}
                    <Typography
                      variant="text"
                      component="text"
                      sx={{ lineHeight: "55px", color: "white" }}
                    >
                      Fecha: {eventos.fecha}
                    </Typography>
                  </Box>
                  <Box>
                    {" "}
                    <Typography
                      variant="text"
                      component="text"
                      sx={{ lineHeight: "45px", color: "white" }}
                    >
                      Categoria: {eventos.categoria}
                    </Typography>
                  </Box>
                  <Box>
                    {" "}
                    <Typography
                      variant="text"
                      component="text"
                      sx={{ lineHeight: "45px", color: "white" }}
                    >
                      Hora de inicio {eventos.hora}
                    </Typography>
                  </Box>
                  <Box>
                    {" "}
                    <Typography
                      variant="text"
                      component="text"
                      sx={{ lineHeight: "45px", color: "white" }}
                    >
                      Lugar: {eventos.lugar}
                    </Typography>
                  </Box>
                  <Box>
                    {" "}
                    <Typography
                      variant="text"
                      component="text"
                      sx={{ lineHeight: "45px", color: "white" }}
                    >
                      Precio: {eventos.precio}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ width: "100%", alignSelf: "end" }}>
                  <Button
                    onClick={cartHandler}
                    fullWidth
                    sx={{
                      padding: "12px",
                      width: "80%",
                      fontWeight: "bold",
                      backgroundColor: "rgb(234, 238,108)",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "rgb(234, 238,108)",
                      },
                    }}
                  >
                    {eventos.precio !== 0 ? " Comprar Entradas" : "Continuar"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>{" "}
          <Container
            display="flex"
            sx={{
              height: "100px",
              border: "1px solid white",
              borderRadius: "15px",
              color: "white",
              width: "80% ",
            }}
          >
            <Typography variant="text" component="text">
              Descripcion del evento: {eventos.descripcion}
            </Typography>
          </Container>
          <Box display={"flex"} mt={5} justifyContent="center">
            <Image height="100" width="1150px" alt="Input" src={input1.src} />
          </Box>
        </Box>
      )}
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
