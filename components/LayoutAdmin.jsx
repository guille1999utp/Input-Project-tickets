import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { AiFillLike } from "react-icons/ai";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import StarBorder from "@mui/icons-material/StarBorder";
import { FaUser, FaPlusCircle } from "react-icons/fa";
import { GiDatabase } from "react-icons/gi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import client from "../utils/client";

export const LayoutAdmin = ({ children }) => {
  const [open, setOpen] = useState({
    first: false,
    second: false,
    three: false,
    four: false,
  });
  const [state, setState] = useState({
    eventos: [],
    error: "",
    loading: true,
  });
  const { eventos } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventos = await client.fetch(`*[_type == 'eventos']`);
        setState({ eventos, loading: false });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
    };
    fetchData();
  }, []);
  console.log(eventos);
  const handleClick = (name) => {
    setOpen({
      ...open,
      [name]: !open[name],
    });
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
                  <ListItemButton onClick={() => handleClick("first")}>
                    <ListItemIcon>
                      <AiFillLike fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Autorizaciones" />
                    {open.first ? (
                      <MdExpandLess fontSize={30} color="rgb(98,98,94)" />
                    ) : (
                      <MdExpandMore fontSize={30} color="rgb(98,98,94)" />
                    )}
                  </ListItemButton>
                  <Collapse in={open.first} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={() => handleClick("second")}>
                    <ListItemIcon>
                      <FaUser fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                    {open.second ? (
                      <MdExpandLess fontSize={30} color="rgb(98,98,94)" />
                    ) : (
                      <MdExpandMore fontSize={30} color="rgb(98,98,94)" />
                    )}
                  </ListItemButton>
                  <Collapse in={open.second} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={() => handleClick("three")}>
                    <ListItemIcon>
                      <FaPlusCircle fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Ingreso" />
                    {open.three ? (
                      <MdExpandLess fontSize={30} color="rgb(98,98,94)" />
                    ) : (
                      <MdExpandMore fontSize={30} color="rgb(98,98,94)" />
                    )}
                  </ListItemButton>
                  <Collapse in={open.three} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton onClick={() => handleClick("four")}>
                    <ListItemIcon>
                      <GiDatabase fontSize={30} color="rgb(60,167,245)" />
                    </ListItemIcon>
                    <ListItemText primary="Estadistica" />
                    {open.four ? (
                      <MdExpandLess fontSize={30} color="rgb(98,98,94)" />
                    ) : (
                      <MdExpandMore fontSize={30} color="rgb(98,98,94)" />
                    )}
                  </ListItemButton>
                  <Collapse in={open.four} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorder color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
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
                >
                  {eventos?.map((e) => (
                    <MenuItem value={10}>{e.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {children}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
