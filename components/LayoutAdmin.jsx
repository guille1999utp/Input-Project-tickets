import React, { useContext, useEffect, useState, cloneElement } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Drawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AiFillLike } from "react-icons/ai";
import { FaUser, FaPlusCircle } from "react-icons/fa";
import { GiDatabase } from "react-icons/gi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItem from "@mui/material/ListItem";
import client from "../utils/client";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
export const LayoutAdmin = ({ children }) => {
  const router = useRouter();

  const { state, setEventActual, EventActual } = useContext(Store);
  const { userInfo } = state;
  const [stateL, setState] = useState({
    eventos: [],
    error: "",
    loading: true,
  });
  const [drawer, setDrawer] = useState(false);
  const { eventos } = stateL;
  useEffect(() => {
    console.log(userInfo);
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
    router.push(`/dashboard/${name}`);
  };
  console.log(drawer);
  return (
    <>
      <Box
        sx={{ flexGrow: 1, bgcolor: "rgb(222,222,222)", minHeight: "100vh" }}
      >
        <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => handleClick("auth")}>
                <ListItemIcon>
                  <AiFillLike fontSize={30} color="rgb(60,167,245)" />
                </ListItemIcon>
                <ListItemText primary="autorizacion" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleClick("list")}>
                <ListItemIcon>
                  <FaUser fontSize={30} color="rgb(60,167,245)" />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => handleClick("entrada/qwertyuioasdfghjk")}
              >
                <ListItemIcon>
                  <FaPlusCircle fontSize={30} color="rgb(60,167,245)" />
                </ListItemIcon>
                <ListItemText primary="Ingreso" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleClick("estadistica")}>
                <ListItemIcon>
                  <GiDatabase fontSize={30} color="rgb(60,167,245)" />
                </ListItemIcon>
                <ListItemText primary="Estadistica" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleClick("staff")}>
                <ListItemIcon>
                  <GiDatabase fontSize={30} color="rgb(60,167,245)" />
                </ListItemIcon>
                <ListItemText primary="Staff" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}>
          <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{
                  color: "rgb(60,167,245)",
                  background: "white",
                  fontWeight: "600",
                }}
              >
                Input
              </Button>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container spacing={2} flexWrap="nowrap">
          <Grid
            item
            xs={2}
            sx={{
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: "250px !important",
              display: { xs: "none", sm: "block" },
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
                  onClick={() => {
                    router.push("/");
                  }}
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
                  <ListItemButton
                    onClick={() => handleClick("entrada/qwertyuioasdfghjk")}
                  >
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
                  <ListItemButton onClick={() => handleClick("staff")}>
                    <ListItemIcon>
                      <GiDatabase fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Staff" />
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
          <Grid
            item
            xs={10}
            sx={{
              margin: "auto",
              pr: { xs: "0px", sm: "50px" },
              maxWidth: { xs: "100% " },
              p: { xs: "20px" },
            }}
          >
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
                  width: { xs: "100%", sm: "50%" },
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
                  onChange={(e) => setEventActual(e.target.value)}
                >
                  {eventos?.map((e) => (
                    <MenuItem key={e._id} value={e._id}>
                      {e.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {cloneElement(children, {
              idEvento: EventActual,
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
