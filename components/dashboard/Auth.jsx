import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Form from "../Form";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { getError } from "../../utils/error";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Store } from "../../utils/Store";
import jsCookie from "js-cookie";
import { useSnackbar } from "notistack";
const Auth = () => {
  const [editStaff, seteditStaff] = useState();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { auth } = state;
  const [usuarios, setusuarios] = useState([]);
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch({ type: "SAVE_AUTH", payload: usuarios });
  }, [usuarios]);
  const handleClickOpen = (u) => {
    setOpen(true);
    seteditStaff(u);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitEditHandler = async ({ rolE, emailE, passwordE }) => {
    console.log("edithandler", rolE, emailE, passwordE);
    console.log("pastValues", rol.value, email.value, password.value);
  };

  const submitHandler = async ({ rol, email, password }) => {
    try {
      const { data } = await axios.post("/api/users/register", {
        rol,
        email,
        password,
      });

      setusuarios([...usuarios, data]);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const name = editStaff?.email;
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "white", p: 4 }}
    >
      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogContent sx={{ backgroundColor: "white" }}>
          {" "}
          <Form onSubmit={handleSubmit(submitEditHandler)}>
            <Grid container display="flex" justifyContent="center">
              <Grid item md={10}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: "rgba(110,247,120)",
                    width: "100%",
                    height: "50px",
                    borderRadius: 5,
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      justifytext: "center",
                      color: "black",
                      fontweight: "bold",
                    }}
                  >
                    Editar staff {name}
                  </Typography>
                </Box>
              </Grid>{" "}
              <Grid item pb={1} md={4}>
                {" "}
                <Controller
                  name="rolE"
                  control={control}
                  defaultValue={editStaff?.rol}
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      className="textInput"
                      sx={{ backgroundColor: "grey" }}
                      variant="outlined"
                      fullWidth
                      id="rolE"
                      size="small"
                      label="Cargo"
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
                ></Controller>
              </Grid>
              <Grid
                item
                pb={1}
                md={6}
                display="flex"
                justifyContent="space-between"
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography sx={{ pl: 2, color: "black" }}>
                    Acceso de Organizador
                  </Typography>{" "}
                </Box>
                <Box>
                  <CheckCircleIcon
                    sx={{ color: "green !important" }}
                    fontSize="large"
                  />
                  <CancelIcon
                    sx={{ color: "red !important" }}
                    fontSize="large"
                  />
                </Box>
              </Grid>
              <Grid item pb={1} md={4}>
                <Controller
                  name="emailE"
                  control={control}
                  defaultValue={editStaff?.email}
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      className="textInput"
                      variant="outlined"
                      fullWidth
                      id="emailE"
                      size="small"
                      label="Usuario"
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
                ></Controller>
              </Grid>
              <Grid
                item
                pb={1}
                md={6}
                display="flex"
                justifyContent="space-between"
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography sx={{ pl: 2, color: "black" }}>
                    Acceso de Promotor
                  </Typography>{" "}
                </Box>
                <Box>
                  <CheckCircleIcon
                    sx={{ color: "green !important" }}
                    fontSize="large"
                  />
                  <CancelIcon
                    sx={{ color: "red !important" }}
                    fontSize="large"
                  />
                </Box>
              </Grid>
              <Grid item pb={1} md={4}>
                {" "}
                <Controller
                  name="passwordE"
                  control={control}
                  defaultValue={editStaff?.password}
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      defaultValue={editStaff.password}
                      className="textInput"
                      variant="outlined"
                      fullWidth
                      id="passwordE"
                      size="small"
                      label="Contraseña"
                      inputProps={{ type: "number" }}
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
                ></Controller>
              </Grid>
              <Grid
                item
                pb={1}
                md={6}
                display="flex"
                justifyContent="space-between"
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography sx={{ pl: 2, color: "black" }}>
                    Acceso de Guardias
                  </Typography>{" "}
                </Box>
                <Box>
                  <CheckCircleIcon
                    sx={{ color: "green !important" }}
                    fontSize="large"
                  />
                  <CancelIcon
                    sx={{ color: "red !important" }}
                    fontSize="large"
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid md={4} display="flex" justifyContent="center" mt={2}>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "rgba(110,247,120)",
                  color: "black",
                  width: 200,
                  borderRadius: "10px",
                }}
              >
                {" "}
                Editar
              </Button>
            </Grid>
          </Form>
        </DialogContent>
      </Dialog>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Grid container display="flex" justifyContent="center">
          <Grid item md={10}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "rgba(110,247,120)",
                width: "100%",
                height: "50px",
                borderRadius: 5,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  justifytext: "center",
                  color: "black",
                  fontweight: "bold",
                }}
              >
                Crear Nuevo Staff
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item pb={1} md={4}>
            {" "}
            <Controller
              name="rol"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  className="textInput"
                  sx={{ backgroundColor: "grey" }}
                  variant="outlined"
                  fullWidth
                  id="rol"
                  size="small"
                  label="Cargo"
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
            ></Controller>
          </Grid>
          <Grid
            item
            pb={1}
            md={6}
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography sx={{ pl: 2 }}>Acceso de Organizador</Typography>{" "}
            </Box>
            <Box>
              <CheckCircleIcon
                sx={{ color: "green !important" }}
                fontSize="large"
              />
              <CancelIcon sx={{ color: "red !important" }} fontSize="large" />
            </Box>
          </Grid>
          <Grid item pb={1} md={4}>
            {" "}
            <Controller
              name="email"
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
                  id="email"
                  size="small"
                  label="Usuario"
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
            ></Controller>
          </Grid>
          <Grid
            item
            pb={1}
            md={6}
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography sx={{ pl: 2 }}>Acceso de promotor</Typography>{" "}
            </Box>
            <Box>
              <CheckCircleIcon
                sx={{ color: "green !important" }}
                fontSize="large"
              />
              <CancelIcon sx={{ color: "red !important" }} fontSize="large" />
            </Box>
          </Grid>
          <Grid item pb={1} md={4}>
            {" "}
            <Controller
              name="password"
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
                  id="password"
                  size="small"
                  label="Contraseña"
                  inputProps={{ type: "number" }}
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
            ></Controller>
          </Grid>
          <Grid
            item
            pb={1}
            md={6}
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography sx={{ pl: 2 }}>Acceso de Guardias</Typography>{" "}
            </Box>
            <Box>
              <CheckCircleIcon
                sx={{ color: "green !important" }}
                fontSize="large"
              />
              <CancelIcon sx={{ color: "red !important" }} fontSize="large" />
            </Box>
          </Grid>
        </Grid>
        <Grid md={4} display="flex" justifyContent="end">
          <Button
            type="submit"
            sx={{
              backgroundColor: "rgba(110,247,120)",
              color: "black",
              width: 200,
              borderRadius: "10px",
              mr: 14,
            }}
          >
            {" "}
            Crear
          </Button>
        </Grid>
        <Grid>
          {" "}
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Cargo</TableCell>
                  <TableCell align="right">Usuario</TableCell>
                  <TableCell align="right">Contraseña</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ border: "0.5px solid grey", borderRadius: "50%" }}
              >
                {usuarios?.map((user, i) => (
                  <TableRow
                    key={user.i}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="right">{user.rol}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.password}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        onClick={() => {
                          handleClickOpen(user);
                        }}
                        sx={{
                          backgroundColor: "rgba(110,247,120)",
                          color: "black",
                          width: " 60%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                      >
                        Editararr
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Form>
    </Box>
  );
};

export default Auth;
