import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Divider,
  ButtonGroup,
  Container,
  useMediaQuery,
  Link,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Layout from "../../components/Layout";
import classes from "../../utils/classes";
import client from "../../utils/client";
import { urlFor, urlForThumbnail } from "../../utils/image";
import { Store } from "../../utils/Store";
import axios from "axios";
import { useRouter } from "next/router";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
export default function ProductScreen(props) {
  const router = useRouter();
  const { slug } = props;
  const { dispatch, state } = useContext(Store);
  const { currency } = state;
  const { enqueueSnackbar } = useSnackbar();
  const [stateLocal, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });
  const { product, loading, error } = stateLocal;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `
            *[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );

        setState({ ...stateLocal, product, loading: false });
      } catch (err) {
        setState({ ...stateLocal, error: err.message, loading: false });
      }
    };
    fetchData();
  }, [slug]);
  const [size, setsize] = useState("");
  const [quantity, setquantity] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);
  const noStock = () => {
    setquantity(0);
    enqueueSnackbar("No quedan disponibles unidades en esta talla", {
      variant: "error",
    });
  };
  const addQuantity = async () => {
    if (size !== "") {
      if (size === "XS" && quantity < product.xs && product.xs !== 0) {
        setquantity(quantity + 1);
        console.log(quantity);
      } else if (size === "S" && quantity < product.s && product.s !== 0) {
        setquantity(quantity + 1);
        console.log(quantity);
      } else if (size === "M" && quantity < product.m && product.m !== 0) {
        setquantity(quantity + 1);
        console.log(quantity);
      } else if (size === "L" && quantity < product.l && product.l !== 0) {
        setquantity(quantity + 1);
      } else {
        enqueueSnackbar("Maxima cantidad alcanzada", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Selecione talla", { variant: "error" });
    }
  };
  const decQuantity = async () => {
    if (size !== "") {
      if (size === "XS" && quantity < product.xs) {
        setquantity(quantity - 1);
      } else if (size === "S" && quantity > 0) {
        setquantity(quantity - 1);
      } else if (size === "M" && quantity > 0) {
        setquantity(quantity - 1);
      } else if (size === "L" && quantity > 0) {
        setquantity(quantity - 1);
      } else {
        enqueueSnackbar("La cantidad debe ser mayor a 0", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Selecione talla", { variant: "error" });
    }
  };
  const buyNowHandler = async () => {
    // const { data } = await axios.get(`/api/products/${product._id}`);

    if (quantity === 0) {
      enqueueSnackbar("Seleciona talla", { variant: "error" });

      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStockXS: product.xs,
        countInStockS: product.s,
        countInStockM: product.m,
        countInStockL: product.l,
        slug: product.slug.current,
        price: product.price,
        priceusd: product.priceusd,
        image: urlForThumbnail(product.image && product.image[0]),
        quantity,
        size,
      },
    });
    enqueueSnackbar(`${product.name} Agregada al Carrito`, {
      variant: "success",
    });
    router.push("/cart");
  };
  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    if (quantity === 0) {
      enqueueSnackbar("Seleciona talla", { variant: "error" });

      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStockXS: product.xs,
        countInStockS: product.s,
        countInStockM: product.m,
        countInStockL: product.l,
        slug: product.slug.current,
        price: product.price,
        priceusd: product.priceusd,
        image: urlForThumbnail(product.image && product.image[0]),
        quantity,
        size,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: "success",
    });
    router.push("/");
  };
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const [selectedXs, setselecteXs] = useState(false);
  const [selectedS, setselectedS] = useState(false);
  const [selectedM, setselectedM] = useState(false);
  const [selectedL, setselectedL] = useState(false);

  return (
    <Layout title={product?.title}>
      <Box display="flex" sx={classes.productosIndex}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: " coolvetica, sans-serif",
            fontSize: "0.8rem",
          }}
        >
          Envío gratis a todo el país por compras superiores a $200.000
        </Typography>
      </Box>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <Box>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
                marginLeft: "25px",
              }}
            >
              <Typography>
                <NextLink href={"/"} passHref>
                  <Link
                    sx={{
                      color: "#CFCFCF",
                      fontFamily: " Helvetica, ",
                      fontWeight: "400",
                      fontStyle: "italic",
                      marginRight: "5px",
                    }}
                  >
                    Inicio{" "}
                  </Link>
                </NextLink>
              </Typography>
              <Typography
                sx={{
                  fontFamily: " Helvetica, ",
                  fontWeight: "700",
                  fontStyle: "italic",
                }}
              >
                / {product.name}
              </Typography>
            </Box>
            <Grid container spacing={6}>
              <Grid item md={6} xs={12} sx={{ marginTop: "70px" }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={isDesktop ? classes.hidden : classes.titleMobile}
                >
                  {product.name}
                </Typography>
                <Box display={"flex"} sx={{ justifyContent: "center" }}>
                  <Image
                    className="big-image"
                    src={urlFor(product.image && product.image[index])}
                    key={product.image._key}
                    alt={product.name}
                    width={500}
                    height={500}
                  />
                </Box>
                <Box>
                  <div className="small-images-container">
                    {product.image?.map((item, i) => (
                      <div
                        key={item.name}
                        className={
                          i === index
                            ? "small-image selected-image"
                            : "small-image"
                        }
                      >
                        <Image
                          key={item.key}
                          width={70}
                          height={70}
                          alt={item.name}
                          src={urlFor(item)}
                          className={
                            i === index
                              ? "small-image selected-image"
                              : "small-image"
                          }
                          onMouseEnter={() => setIndex(i)}
                        />
                      </div>
                    ))}
                  </div>
                </Box>
              </Grid>
              <Grid item md={6} xs={12} sx={{ marginTop: "40px" }}>
                <List>
                  <ListItem className="nopadLeft">
                    <Typography variant="h1" component="h1" sx={classes.title}>
                      {product.name}
                    </Typography>
                  </ListItem>
                  <ListItem className="nopadLeft">
                    <Typography sx={classes.bold}>
                      {currency.curre === "default"
                        ? "$" +
                          new Intl.NumberFormat().format(
                            parseInt(product.price)
                          )
                        : new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          }).format(parseInt(product.priceusd))}
                    </Typography>
                  </ListItem>
                  <Divider sx={classes.line} />
                  <ListItem
                    paddingBottom={"50px"}
                    sx={{ paddingBottom: "16px" }}
                    className="nopadLeft"
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontFamily: " Helvetica,",
                      }}
                    >
                      Tallas: {size}
                    </Typography>
                    <Button
                      sx={{
                        textTransform: "none",
                        backgroundColor: "transparent",
                        textDecoration: "underline ",
                        borderWidth: "2",
                        textDecorationThickness: "1.5px",
                        fontFamily: " Helvetica, ",
                        fontWeight: "400",
                        fontStyle: "italic",
                      }}
                    >
                      <NextLink href={"/"} passHref>
                        <Link
                          sx={{
                            color: "#CFCFCF",
                            marginLeft: "50px",

                            "&:hover": {
                              color: "#CFCFCF",
                              transform: "scale(1.1, 1.1)",
                            },
                          }}
                        >
                          {" "}
                          Guía tallas
                        </Link>
                      </NextLink>
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Grid container spacing={2}>
                      <Grid item className="nopadLeft">
                        <Button
                          size="small"
                          variant=""
                          onClick={() => {
                            quantity < product.xs ? setquantity(1) : noStock();

                            setsize("XS");

                            setselecteXs(true);
                            setselectedS(false);
                            setselectedM(false);
                            setselectedL(false);
                          }}
                          sx={selectedXs ? classes.but : classes.selected}
                        >
                          XS
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          variant=""
                          onClick={() => {
                            quantity < product.s ? setquantity(1) : noStock();
                            setsize("S");

                            setselecteXs(false);
                            setselectedS(true);
                            setselectedM(false);
                            setselectedL(false);
                          }}
                          sx={selectedS ? classes.but : classes.selected}
                        >
                          S
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("M");
                            quantity < product.m ? setquantity(1) : noStock();

                            setselecteXs(false);
                            setselectedS(false);
                            setselectedM(true);
                            setselectedL(false);
                          }}
                          sx={selectedM ? classes.but : classes.selected}
                        >
                          M
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          variant=""
                          onClick={() => {
                            setsize("L");
                            setselecteXs(false);
                            setselectedS(false);
                            setselectedM(false);
                            setselectedL(true);
                            quantity < product.l ? setquantity(1) : noStock();
                          }}
                          sx={selectedL ? classes.but : classes.selected}
                        >
                          L
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem className="nopadLeft">
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontFamily: " helvetica, sans-serif",
                      }}
                    >
                      Cantidad:
                    </Typography>
                  </ListItem>
                  <ButtonGroup
                    sx={classes.buttonGroup}
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button onClick={decQuantity} sx={classes.buttonGroup}>
                      -
                    </Button>
                    <Button sx={classes.buttonQ}>{quantity}</Button>
                    <Button sx={classes.buttonGroup} onClick={addQuantity}>
                      +
                    </Button>
                  </ButtonGroup>
                  <ListItem className="nopadLeft">
                    <Button
                      sx={classes.blackline}
                      onClick={addToCartHandler}
                      fullWidth
                      variant=""
                    >
                      Agregar al carrito
                    </Button>
                  </ListItem>
                  <ListItem className="nopadLeft">
                    <Button
                      onClick={buyNowHandler}
                      fullWidth
                      variant="contained"
                      sx={classes.buyNow}
                      className="bottomH1"
                    >
                      Comprar Ahora
                    </Button>
                  </ListItem>

                  <Grid container spacing={0}>
                    <Grid item md={12} sx={{ justifyContent: "center" }}>
                      <Grid container spacing={1} sx={{ marginTop: "20px" }}>
                        <Grid item md={6} xs={12}>
                          <Typography
                            fontSize=".8rem"
                            sx={{ fontWeight: "bold" }}
                          >
                            <FiberManualRecordIcon fontSize="small" />{" "}
                            {product.materiales}
                          </Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Typography
                            fontSize=".8rem"
                            sx={{ fontWeight: "bold" }}
                          >
                            <FiberManualRecordIcon fontSize="small" /> Peso:{" "}
                            {product.cantidadmateriales}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                          sx={{ justifyContent: "center" }}
                        >
                          <Typography
                            fontSize=".8rem"
                            sx={{ fontWeight: "bold" }}
                          >
                            <FiberManualRecordIcon fontSize="small" />{" "}
                            {product.description}
                          </Typography>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <Typography
                            fontSize=".8rem"
                            sx={{ fontWeight: "bold" }}
                          >
                            <FiberManualRecordIcon fontSize="small" />{" "}
                            {product.envio}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box
                    display="flex"
                    sx={{ marginTop: "60px", justifyContent: "space-between" }}
                  >
                    <Button
                      sx={{
                        textTransform: "none",
                        backgroundColor: "transparent",
                        textDecoration: "underline ",
                        borderWidth: "2",
                        textDecorationThickness: "1.5px",
                        fontFamily: " Helvetica, ",
                        fontWeight: "400",
                        fontStyle: "italic",
                      }}
                    >
                      <NextLink href={"/"} passHref>
                        <Link
                          sx={{
                            color: "#CFCFCF",
                            "&:hover": {
                              color: "#CFCFCF",
                              transform: "scale(1.1, 1.1)",
                            },
                          }}
                        >
                          {" "}
                          Cuidado
                        </Link>
                      </NextLink>
                    </Button>
                    <Button
                      sx={{
                        textTransform: "none",
                        backgroundColor: "transparent",
                        textDecoration: "underline ",
                        borderWidth: "2",
                        textDecorationThickness: "1.5px",
                        fontFamily: " Helvetica, ",
                        fontWeight: "400",
                        fontStyle: "italic",
                      }}
                    >
                      <NextLink href={"/"} passHref>
                        <Link
                          sx={{
                            color: "#CFCFCF",

                            "&:hover": {
                              color: "#CFCFCF",
                              transform: "scale(1.1, 1.1)",
                            },
                          }}
                        >
                          {" "}
                          Envios
                        </Link>
                      </NextLink>
                    </Button>
                    <Button
                      sx={{
                        textTransform: "none",
                        backgroundColor: "transparent",
                        textDecoration: "underline ",
                        borderWidth: "2",
                        textDecorationThickness: "1.5px",
                        fontFamily: " Helvetica, ",
                        fontWeight: "400",
                        fontStyle: "italic",
                      }}
                    >
                      <NextLink href={"/"} passHref>
                        <Link
                          sx={{
                            color: "#CFCFCF",

                            "&:hover": {
                              color: "#CFCFCF",
                              transform: "scale(1.1, 1.1)",
                            },
                          }}
                        >
                          Devoluciones
                        </Link>
                      </NextLink>
                    </Button>
                  </Box>
                </List>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
