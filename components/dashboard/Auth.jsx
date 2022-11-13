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
import { useSnackbar } from "notistack";

import { CopyToClipboard } from "react-copy-to-clipboard";
const Auth = ({ idEvento }) => {
  const [editStaff, seteditStaff] = useState();
  const [usersReferente, setUsersReferente] = useState([]);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    handleSubmit: handleSubmit2,
    control: control2,
    reset,
    formState: { errors: errors2 },
  } = useForm();

  const handleClickOpen = (u) => {
    setOpen(true);
    seteditStaff(u);
  };
  const handleClose = () => {
    reset(
      {
        rolE: "",
        emailE: "",
        passwordE: "",
      },
      {
        keepErrors: true,
        keepDirty: true,
      }
    );
    setOpen(false);
  };
  const submitEditHandler = async ({ rolE, emailE, passwordE }) => {
    const { data } = await axios.put(
      "/api/users/createReferent",
      {
        name: emailE,
        _id: editStaff._id,
        rol: rolE,
        email: emailE,
        password: passwordE,
      },
      {
        headers: { authorization: `${userInfo.token}` },
      }
    );
    setUsersReferente([
      ...usersReferente.filter((user) => user._id !== editStaff._id),
      data,
    ]);
    setOpen(false);
    seteditStaff({});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          "/api/users/eventReferent",
          { idEvento },
          {
            headers: { authorization: `${userInfo.token}` },
          }
        );

        setUsersReferente(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idEvento]);

  const submitHandler = async ({ rol, name, password }) => {
    try {
      if (!idEvento)
        return enqueueSnackbar(
          getError({
            response: { data: { message: "Selecciona un evento!!" } },
          }),
          { variant: "error" }
        );
      const { data } = await axios.post(
        "/api/users/createReferent",
        {
          rol,
          name,
          password,
          idEvento,
        },
        {
          headers: { authorization: `${userInfo.token}` },
        }
      );
      setUsersReferente([...usersReferente, data]);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const name = editStaff?.email;
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        minHeight: "50vh",
        backgroundColor: "white",
        p: 4,
        borderRadius: "20px",
      }}
    >
      <Dialog open={open} onClose={handleClose} className="dialog">
        <DialogContent sx={{ backgroundColor: "white" }}>
          {" "}
          <Form onSubmit={handleSubmit2(submitEditHandler)}>
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
                  control={control2}
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
                      error={Boolean(errors2.name)}
                      helperText={
                        errors2.name
                          ? errors2.name.type === "minLength"
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
                  control={control2}
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
                      error={Boolean(errors2.name)}
                      helperText={
                        errors2.name
                          ? errors2.name.type === "minLength"
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
                  control={control2}
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      className="textInput"
                      variant="outlined"
                      fullWidth
                      id="passwordE"
                      size="small"
                      label="Contraseña"
                      inputProps={{ type: "number" }}
                      error={Boolean(errors2.name)}
                      helperText={
                        errors2.name
                          ? errors2.name.type === "minLength"
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
                  sx={{ backgroundColor: "rgb(222,222,222)" }}
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
              name="name"
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
                  id="name"
                  sx={{ backgroundColor: "rgb(222,222,222)" }}
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
                  sx={{ backgroundColor: "rgb(222,222,222)" }}
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
        <Grid display="flex" justifyContent="end">
          <Button
            type="submit"
            sx={{
              backgroundColor: "rgba(110,247,120)",
              color: "black",
              width: 200,
              borderRadius: "10px",
              m: { xs: "auto", sm: "0 112px 0 0" },
              mr: 14,
              height: "40px",
            }}
          >
            {" "}
            Crear
          </Button>
        </Grid>

        <Grid sx={{ mt: "30px" }}>
          {" "}
          <TableContainer>
            <Table aria-label="simple table" className="tableAuth">
              <TableHead>
                <TableRow mb="20px">
                  <TableCell className="bordern">#</TableCell>
                  <TableCell className="bordern" align="right">
                    Cargo
                  </TableCell>
                  <TableCell className="bordern" align="right">
                    Usuario
                  </TableCell>
                  <TableCell className="bordern" align="right">
                    Contraseña
                  </TableCell>
                  <TableCell className="bordern" align="right">
                    Link
                  </TableCell>
                  <TableCell className="bordern" align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ border: "0.5px solid grey", borderRadius: "50%" }}
              >
                {usersReferente
                  ?.map((user, i) => (
                    <TableRow
                      spacing={10}
                      key={user._id}
                      sx={{
                        mt: 5,
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        padding="normal"
                        component="th"
                        scope="row"
                        className="authLeft"
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell align="right" className="authCenter">
                        {user.rol}
                      </TableCell>
                      <TableCell align="right" className="authCenter">
                        {user.name}
                      </TableCell>
                      <TableCell align="right" className="authCenter">
                        {user.password}
                      </TableCell>
                      <CopyToClipboard
                        text={`localhost:3000/?staff=${user._id}`}
                      >
                        <TableCell
                          align="right"
                          className="authRight"
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            enqueueSnackbar("copiado correctamente", {
                              variant: "success",
                            })
                          }
                        >
                          inputlatam/?staff={user._id}
                        </TableCell>
                      </CopyToClipboard>
                      <TableCell align="center" className="authEdit">
                        {" "}
                        <Button
                          onClick={() => {
                            reset(
                              {
                                rolE: user.rol,
                                emailE: user.email,
                                passwordE: user.password,
                              },
                              {
                                keepErrors: true,
                                keepDirty: true,
                              }
                            );
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
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                  .reverse()}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Form>
    </Box>
  );
};

export default Auth;
