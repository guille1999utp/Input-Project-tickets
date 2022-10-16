import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Container,
  // useMediaQuery,
} from "@mui/material";
import Image from 'next/image'

import { useEffect, useState } from "react";
//
import Layout from "../../components/Layout";
import client from "../../utils/client";
import { urlFor } from "../../utils/image";
// import { Store } from "../../utils/Store";
// import axios from "axios";
// import { useRouter } from "next/router";

export default function ProductScreen(props) {
  // const router = useRouter();
  const { slug } = props;
  // const { dispatch, state } = useContext(Store);
  // const { enqueueSnackbar } = useSnackbar();
  const [stateLocal, setState] = useState({
    eventos: null,
    loading: true,
    error: "",
  });
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

        setState({  eventos, loading: false });
      } catch (err) {
        setState({  error: err.message, loading: false });
      }
    };
    fetchData();
  }, [slug]);
  // const [size, setsize] = useState("");
  // const [quantity, setquantity] = useState(0);

  // useEffect(() => {
  //   return () => {};
  // }, []);
  // const noStock = () => {
  //   setquantity(0);
  //   enqueueSnackbar("No quedan disponibles unidades en esta talla", {
  //     variant: "error",
  //   });
  // };
  // const addQuantity = async () => {
  //   if (size !== "") {
  //     if (size === "XS" && quantity < product.xs && product.xs !== 0) {
  //       setquantity(quantity + 1);
  //       console.log(quantity);
  //     } else if (size === "S" && quantity < product.s && product.s !== 0) {
  //       setquantity(quantity + 1);
  //       console.log(quantity);
  //     } else if (size === "M" && quantity < product.m && product.m !== 0) {
  //       setquantity(quantity + 1);
  //       console.log(quantity);
  //     } else if (size === "L" && quantity < product.l && product.l !== 0) {
  //       setquantity(quantity + 1);
  //     } else {
  //       enqueueSnackbar("Maxima cantidad alcanzada", { variant: "error" });
  //     }
  //   } else {
  //     enqueueSnackbar("Selecione talla", { variant: "error" });
  //   }
  // };
  // const decQuantity = async () => {
  //   if (size !== "") {
  //     if (size === "XS" && quantity < product.xs) {
  //       setquantity(quantity - 1);
  //     } else if (size === "S" && quantity > 0) {
  //       setquantity(quantity - 1);
  //     } else if (size === "M" && quantity > 0) {
  //       setquantity(quantity - 1);
  //     } else if (size === "L" && quantity > 0) {
  //       setquantity(quantity - 1);
  //     } else {
  //       enqueueSnackbar("La cantidad debe ser mayor a 0", { variant: "error" });
  //     }
  //   } else {
  //     enqueueSnackbar("Selecione talla", { variant: "error" });
  //   }
  // };
  // const buyNowHandler = async () => {
  //   // const { data } = await axios.get(`/api/products/${product._id}`);

  //   if (quantity === 0) {
  //     enqueueSnackbar("Seleciona talla", { variant: "error" });

  //     return;
  //   }

  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: {
  //       _key: product._id,
  //       name: product.name,
  //       countInStockXS: product.xs,
  //       countInStockS: product.s,
  //       countInStockM: product.m,
  //       countInStockL: product.l,
  //       slug: product.slug.current,
  //       price: product.price,
  //       priceusd: product.priceusd,
  //       image: urlForThumbnail(product.image && product.image[0]),
  //       quantity,
  //       size,
  //     },
  //   });
  //   enqueueSnackbar(`${product.name} Agregada al Carrito`, {
  //     variant: "success",
  //   });
  //   router.push("/cart");
  // };
  // const addToCartHandler = async () => {
  //   const { data } = await axios.get(`/api/products/${product._id}`);
  //   console.log(data);
  //   if (quantity === 0) {
  //     enqueueSnackbar("Seleciona talla", { variant: "error" });

  //     return;
  //   }

  //   dispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: {
  //       _key: product._id,
  //       name: product.name,
  //       countInStockXS: product.xs,
  //       countInStockS: product.s,
  //       countInStockM: product.m,
  //       countInStockL: product.l,
  //       slug: product.slug.current,
  //       price: product.price,
  //       priceusd: product.priceusd,
  //       image: urlForThumbnail(product.image && product.image[0]),
  //       quantity,
  //       size,
  //     },
  //   });
  //   enqueueSnackbar(`${product.name} added to the cart`, {
  //     variant: "success",
  //   });
  //   router.push("/");
  // };
  // const isDesktop = useMediaQuery("(min-width:600px)");

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
                  src={urlFor(eventos.image[0])}/>
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
                    Comprar Entradas
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
              Descripcion del evento{" "}
            </Typography>
          </Container>
          <Box display="flex" justifyContent="center" sx={{ color: "white" }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{ marginBottom: "4px " }}
            >
              Localidades y precios disponibles
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" sx={{ color: "white" }}>
            <Typography
              sx={{ fontSize: "0.8rem" }}
              variant="text"
              component="text"
            >
              Escoge la opcion que mejor se adapte a lo que estas buscando
            </Typography>
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
