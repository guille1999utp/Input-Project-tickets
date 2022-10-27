import React, { useContext, useEffect, useState,cloneElement } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiFillLike } from "react-icons/ai";
import { FaUser, FaPlusCircle } from "react-icons/fa";
import { GiDatabase } from "react-icons/gi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import client from "../utils/client";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
export const LayoutAdmin = ({ children }) => {
  const router = useRouter();

  const { state, setEventActual,EventActual } = useContext(Store);
  const { userInfo } = state;
  const [stateL, setState] = useState({
    eventos: [],
    error: "",
    loading: true,
  });
  const { eventos } = stateL;
  useEffect(() => {
    if (userInfo?.rol !== "Admin") {
      return router.push("/?redirect=/dashboard/auth");
    }
  }, [userInfo]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventos = await client.fetch(
          `*[_type == 'eventos'&& referente._ref == "${userInfo._id}"]`
        );
        setState({ eventos, loading: false });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
    };
    fetchData();
  }, []);

  const handleClick = (name) => {
    router.push(`/dashboard/${name}`)
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, bgcolor: "rgb(222,222,222)" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minWidth: "250px",
                height: "100vh",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={{
                    bgcolor: "white",
                    fontSize: 30,
                    fontWeight: "600",
                    px: 5,
                    margin: "20px auto",
                    color: "rgb(60,167,245)",
                  }}
                >
                  Input
                </Button>
                <List sx={{ marginTop: "50px" }}>
                  <ListItemButton onClick={() => handleClick("auth")}>
                    <ListItemIcon>
                      <AiFillLike fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Autorizaciones" />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleClick("list")}>
                    <ListItemIcon>
                      <FaUser fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleClick("three")}>
                    <ListItemIcon>
                      <FaPlusCircle fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Ingreso" />
                  </ListItemButton>
                  <ListItemButton onClick={() => handleClick("estadistica")}>
                    <ListItemIcon>
                      <GiDatabase fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Estadistica" />
                  </ListItemButton>
                </List>
              </div>
              <Button
                sx={{
                  bgcolor: "rgb(60,167,245)",
                  fontSize: 14,
                  fontWeight: "600",
                  px: 5,
                  width: "80%",
                  margin: "20px auto",
                  color: "white",
                }}
              >
                Volver a la pagina de Eventos
              </Button>
            </Box>
          </Grid>
          <Grid item xs={10} sx={{ pr: "50px" }}>
            <Box
              sx={{
                background: "white",
                my: "20px",
                p: "30px",
                borderRadius: "20px",
              }}
            >
              <FormControl
                sx={{
                  m: 1,
                  width: "50%",
                  background: "rgb(212,212,212)",
                  borderRadius: "10px",
                }}
              >
                <InputLabel
                  sx={{ fontWeight: "600" }}
                  id="demo-simple-select-autowidth-label"
                >
                  Seleccione el Evento
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="Seleccione el Evento"
                  value={EventActual}
                  onChange={(e)=>setEventActual(e.target.value)}
                >
                  {eventos?.map((e) => (
                    <MenuItem value={e._id}>{e.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {cloneElement(children,{
              idEvento:EventActual
            }) }
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
