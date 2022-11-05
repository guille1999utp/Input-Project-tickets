import { Box, Divider, Grid } from "@mui/material";

const Entrada = () => {
  return (
    <Box
      display="flex"
      justifyContent="start"
      flexDirection="column"
      sx={{
        minHeight: "50vh",
        backgroundColor: "white",
        p: 4,
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "black",
          height: "10px",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            backgroundColor: "rgb(41, 41,41)",
            height: "60px",
            color: "white",
            fontSize: "2rem",
          }}
        >
          Descripcion Persona
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "rgb(212, 212,212)",
            height: "100px",
            borderRadius: "20px",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ height: "100%" }}
            >
              <Box sx={{ fontWeight: "bold" }}>Nombre</Box>
              <Divider
                style={{
                  width: "60%",
                  color: "black",
                  opacity: "1",
                  borderColor: "none",
                }}
              />
              <Box mt={1}>Nombre persona</Box>
            </Grid>
            <Grid
              item
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ height: "100%" }}
            >
              <Box>Nombre</Box>
              <Divider
                style={{
                  width: "60%",
                  color: "black",
                  opacity: "1",
                  borderColor: "none",
                }}
              />
              <Box mt={1}>Nombre persona</Box>
            </Grid>
            <Grid
              item
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ height: "100%" }}
            >
              <Box>Nombre</Box>
              <Divider
                style={{
                  width: "60%",
                  color: "black",
                  opacity: "1",
                  borderColor: "none",
                }}
              />
              <Box mt={1}>Nombre persona</Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: "200px",
          width: "100%",
          backgroundColor: "rgb(65,208,155)",
          height: "60px",
          color: "black",
          fontSize: "3rem",
          fontWeight: "bold",
          borderRadius: "15px",
        }}
      >
        CHECK IN
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          backgroundColor: "rgb(215,8,14)",
          height: "60px",
          color: "black",
          fontSize: "3rem",
          fontWeight: "bold",
          borderRadius: "15px",
        }}
      >
        BOLETA YA USADA
      </Box>
    </Box>
  );
};

export default Entrada;
