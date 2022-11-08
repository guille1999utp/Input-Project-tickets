import { Box, Divider, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState} from "react";
import { Store } from "../../utils/Store";
import client from "../../utils/client";
import axios from "axios";
import { useSnackbar } from "notistack";
const Entrada = ({id}) => {
  const router = useRouter();
  const [stateL, setState] = useState({
    eventos: [],
    error: "",
    loading: true,
  });

  const { enqueueSnackbar } = useSnackbar();
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (!["Admin","Guard"].includes(userInfo?.rol)) {
      return router.push("/?redirect=/dashboard/auth");
    }
  }, [userInfo]);

  useEffect(async() => {
      try {
        const eventos = await client.fetch(
          `*[_type == 'ticket' && _id == "${id}"]`
        );
        console.log(eventos);
        setState({ eventos:eventos[0], loading: false });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
  }, [id]);

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
            fontSize:{xs:"1rem",sm:"2rem"},
          }}
        >
          Descripcion Persona
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "rgb(212, 212,212)",
            height:{xs:"auto",sm:"100px"},
            borderRadius: "20px",
          }}
        >
          <Grid container sx={{ height: "100%",flexDirection:{xs:"column",sm:"row"},justifyContent:"space-between",px:"20px" }}>
            <Grid
              item
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ height: "100%",mt:{xs:"10px",sm:"0"} }}
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
              <Box mt={1}>{stateL.eventos?.name}</Box>
            </Grid>
            <Grid
              item
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ height: "100%",mt:{xs:"10px",sm:"0"} }}
            >
              <Box>Cedula</Box>
              <Divider
                style={{
                  width: "60%",
                  color: "black",
                  opacity: "1",
                  borderColor: "none",
                }}
              />
              <Box mt={1}>{stateL.eventos?.cedula}</Box>
            </Grid>
            <Grid
              item
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ height: "100%",mt:{xs:"10px",sm:"0"} }}
            >
              <Box>Correo Electronico</Box>
              <Divider
                style={{
                  width: "60%",
                  color: "black",
                  opacity: "1",
                  borderColor: "none",
                }}
              />
              <Box mt={1}>{stateL.eventos?.correo}</Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {(!stateL.eventos?.activado)?
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
          cursor: "pointer"
        }}
        onClick={async()=>{
          try {
            const { data } = await axios.post("/api/ingreso",{id:stateL.eventos._id}, {
              headers: { authorization: `${userInfo.token}` },
            })
            if(data.data.results[0].operation === "update"){
              setState({...stateL,eventos:{...stateL.eventos,activado:true}})
            }
          } catch (error) {
            enqueueSnackbar("sucedio un error", {
              variant: "error",
            })
          }
        }}
      >
        CHECK IN
      </Box>
      :<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: "200px",
          width: "100%",
          backgroundColor: "rgb(215,8,14)",
          height: "60px",
          color: "black",
          fontSize: "3rem",
          fontWeight: "bold",
          borderRadius: "15px",
          cursor: "pointer"
        }}
      >
        BOLETA YA USADA
      </Box>}
    </Box>
  );
};

export default Entrada;
