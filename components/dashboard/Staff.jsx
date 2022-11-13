import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Store } from "../../utils/Store";
import { useSnackbar } from "notistack";
const Staff = ({ idEvento }) => {
  const [usersReferente, setUsersReferente] = useState([]);

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
        console.log(data);

        setUsersReferente(data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idEvento]);

  const { enqueueSnackbar } = useSnackbar();
  const { state } = useContext(Store);
  const { userInfo } = state;

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
          Staff
        </Typography>
      </Box>
      <Box>
        <TableContainer>
          <Table aria-label="simple table" className="tableAuth">
            <TableHead>
              <TableRow mb="20px">
                <TableCell className="bordern">#</TableCell>
                <TableCell className="bordern" align="center">
                  Cargo
                </TableCell>
                <TableCell className="bordern" align="center">
                  Usuario
                </TableCell>
                <TableCell className="bordern" align="center">
                  Contraseña
                </TableCell>
                <TableCell className="bordern" align="center">
                  Boletas
                </TableCell>
                <TableCell className="bordern" align="center">
                  Cortesias
                </TableCell>
                <TableCell className="bordern" align="center">
                  Codigo
                </TableCell>
                <TableCell className="bordern" align="center">
                  Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: "0.5px solid grey", borderRadius: "50%" }}>
              {usersReferente?.map((user, i) => (
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
                  <TableCell align="center" className="authCenter">
                    {user.rol}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.password}
                  </TableCell>
                  <TableCell align="center" className="authCenter">
                    {user.boletas}
                  </TableCell>
                  <TableCell className="authCenter" align="center">
                    {user.cortesias}
                  </TableCell>
                  <TableCell className="authCenter" align="center">
                    {user._id}
                  </TableCell>
                  <CopyToClipboard text={`localhost:3000/?staff=${user._id}`}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Staff;
