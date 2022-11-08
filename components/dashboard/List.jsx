import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState,useEffect,useContext } from "react";
import { Table } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import client from "../../utils/client";
import { Store } from "../../utils/Store";
import axios from "axios";

export default function ListP({idEvento}) {
  const [usuariosC, setusuarios] = useState([]);
  const [Busqueda, setBusqueda] = useState([]);
  const [view, setView] = useState(0);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ busqueda }) => {
    console.log(busqueda);
    const usuarios = await client.fetch(
      `*[_type == 'ticket' && cedula == '${busqueda}' && evento._ref == '${idEvento}']`
    );
    console.log(usuarios);
    setView(3);
    setBusqueda(usuarios);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/api/users/estadisReferent",{idEvento}, {
          headers: { authorization: `${userInfo.token}` },
        });

        setusuarios(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idEvento]);


  return (
    <Box
      display="flex"
      justifyContent="start"
      flexDirection="column"
      alignItems="center"
      sx={{
        minHeight: "50vh",
        backgroundColor: "white",
        p: 6,
        borderRadius: "20px",
      }}
    >
      <Box
        justifyContent="center"
        display="flex"
        alignItems="center"
        sx={{
          background: "rgb(212,212,212)",
          minHeight: "40px",
          width: "80%",
          border: "2px solid black",
          flexWrap:"wrap"
        }}
      >
        <Button
          sx={{
            background: "rgb(212,212,212)",
            width: "33%",
            color: "black",
            minWidth:"100px"
          }}
          onClick={()=>setView(0)}
        >
          Todos
        </Button>
        <Button
          sx={{
            background: "rgb(212,212,212)",
            width: "33%",
            color: "black",
            minWidth:"100px"
          }}
          onClick={()=>setView(1)}
        >
          Ingresados
        </Button>
        <Button
          sx={{
            background: "rgb(212,212,212)",
            width: "33%",
            color: "black",
            minWidth:"100px"
          }}
          onClick={()=>setView(2)}
        >
          Faltantes
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        mt={2}
        pl={2}
        sx={{ width: "100%" }}
      >
        <form
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Controller
            name="busqueda"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 2,
            }}
            render={({ field }) => (
              <TextField
                className="textInput"
                variant="outlined"
                fullWidth
                id="busqueda"
                sx={{
                  backgroundColor: "rgb(222,222,222)",
                  width: "65%",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
                size="small"
                label="Buscar Persona"
                inputProps={{ type: "name" }}
                error={Boolean(errors.name)}
                helperText={
                  errors.name
                    ? errors.name.type === "minLength"
                      ? "Nombre debe tener mas de un caracter"
                      : "Nombre es obligatorio"
                    : ""
                }
                {...field}
              ></TextField>
            )}
          ></Controller>{" "}
          <Button
            type="submit"
            sx={{
              backgroundColor: "rgba(110,247,120)",
              color: "black",
              width: "18%",
              borderRadius: "10px",
            }}
          >
            Buscar
          </Button>
        </form>
      </Box>

      <Box sx={{ width: "100%" }}>
        <TableContainer>
          <Table
            aria-label="simple table"
            className="tableAuth"
            width="100%"
            sx={{ width: "100%" }}
          >
            <TableHead>
              <TableRow mb="20px">
                <TableCell className="bordern" align="center">#</TableCell>
                <TableCell className="bordern" align="center">
                  Nombre
                </TableCell>
                <TableCell className="bordern" align="center">
                  Cedula
                </TableCell>
                <TableCell className="bordern" align="center">
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: "0.5px solid grey", borderRadius: "50%" }}>
              {view === 0? usuariosC?.map((user, i) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      mb: 10,
                    },
                  }}
                >
                  <TableCell component="th" scope="row" align="center" className="authLeft">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.cedula}
                  </TableCell>
                  <TableCell align="center" className="authRight">
                    {user.activado?"yes":"no"}
                  </TableCell>
                </TableRow>
              )):null}
              {view === 1? usuariosC?.filter((user)=>user.activado).map((user, i) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      mb: 10,
                    },
                  }}
                >
                  <TableCell component="th" scope="row" align="center" className="authLeft">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.cedula}
                  </TableCell>
                  <TableCell align="center" className="authRight">
                    {user.activado?"yes":"no"}
                  </TableCell>
                </TableRow>
              )):null}
              {view === 2? usuariosC?.filter((user)=>!user.activado).map((user, i) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      mb: 10,
                    },
                  }}
                >
                  <TableCell component="th" scope="row" align="center" className="authLeft">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.cedula}
                  </TableCell>
                  <TableCell align="center" className="authRight">
                    {user.activado?"yes":"no"}
                  </TableCell>
                </TableRow>
              )):null}
              {view === 3? Busqueda?.map((user, i) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      mb: 10,
                    },
                  }}
                >
                  <TableCell component="th" scope="row" align="center" className="authLeft">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.cedula}
                  </TableCell>
                  <TableCell align="center" className="authRight">
                    {user.activado?"yes":"no"}
                  </TableCell>
                </TableRow>
              )):null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
