import { Box, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
const generos = ["Masculino", "Femenino", "Indefinido"];
export const CaptUsuario = ({ cantidad, index, control }) => {
  return (
    <>
      <Typography
        variant="text"
        component="text"
        sx={{ color: "white", fontWeight: "bold" }}
      >
        Boleta #{index}:
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ justifyContent: "space-between" }}
      >
        <Controller
          name={`name${index}`}
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,
          }}
          render={({ field }) => (
            <TextField
              sx={{ backgroundColor: "white", width: "48%" }}
              variant="outlined"
              fullWidth
              id={`name${index}`}
              size="small"
              label="Nombre y Apellido"
              inputProps={{ type: "name" }}
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller
          name={`cedula${index}`}
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,
          }}
          render={({ field }) => (
            <TextField
              sx={{ backgroundColor: "white", width: "48%" }}
              variant="outlined"
              fullWidth
              id={`cedula${index}`}
              size="small"
              label="Cedula"
              inputProps={{ type: "number" }}
              {...field}
            ></TextField>
          )}
        ></Controller>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Controller
          name={`genero${index}`}
          control={control}
          defaultValue=""
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <TextField
              size="small"
              margin="normal"
              id={`genero${index}`}
              select
              label="Genero"
              sx={{ width: "48%", backgroundColor: "white" }}
              {...field}
            >
              {generos.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        ></Controller>
        <Controller
          name={`email${index}`}
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          }}
          render={({ field }) => (
            <TextField
              margin="normal"
              size="small"
              sx={{ backgroundColor: "white", width: "48%" }}
              variant="outlined"
              fullWidth
              id={`email${index}`}
              label="Correo Electronico"
              inputProps={{ type: "email" }}
              {...field}
            ></TextField>
          )}
        ></Controller>
      </Box>
    </>
  );
};
