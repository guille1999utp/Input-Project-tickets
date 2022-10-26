import { Box, Grid } from '@mui/material'
import React from 'react'
import { Bar,Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false
      },
    },
    scales: {
        xAxis: {
            display:false
          }
    }
  };

  const optionsCircle = {
    responsive: true,
    plugins: {
      legend: {
        position:"bottom"
      },
    },
  };


 const labels = ['17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'];

 const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 2',
        data: [14,51,64,23,16,63,12],
        backgroundColor: 'rgba(140, 82, 255, 1)',
      },
    ],
  };
  const dataCircle = {
    labels:["hombres","mujer"],
    datasets: [
        {
            label: '',
            data: [25, 40],
            backgroundColor: [
              'rgba(255, 145, 76, 1)',
              'rgba(254, 189, 89, 1)',
            ],
            borderColor: [
            'rgba(255, 145, 76, 1)',
            'rgba(254, 189, 89, 1)'
            ],
            borderWidth: 1,
        }
    ],
  };

  const dataCircle2 = {
    labels:["hombres","mujer"],
    datasets: [
        {
            label: '',
            data: [15, 25],
            backgroundColor: [
              'rgba(52, 121, 251, 1)',
              'rgba(109, 180, 246, 1)',
            ],
            borderColor: [
                'rgba(52, 121, 251, 1)',
                'rgba(109, 180, 246, 1)',
            ],
            borderWidth: 1,
        }
    ],
  };
export const Estadistica = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ minHeight: "50vh", backgroundColor: "white", p: 4,borderRadius:"20px"}}
    >
        <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <Box className='box-data blue'>
                <p className='box-data-title'>Ingresos Totales</p>
                <h5 className='box-data-price'>2.400.000</h5>
                <p className='box-data-text'>Dinero obtenido por la venta de boletas</p>
            </Box>
            <Box className='box-data purple' sx={{mt:"20px"}}>
                <p className='box-data-title'>Dinero Desembolsado</p>
                <h5 className='box-data-price'>1.000.000</h5>
                <p className='box-data-text'>Dinero entregado por parte de la Ticketera</p>
            </Box>
            <Box className='box-data barchart' sx={{mt:"20px"}}>
                <p className='box-data-title black'>Desempeño de Ventas por dia</p>
                <Bar options={options} data={data} />
            </Box>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column"}}>
            <Box className='box-data sky'>
                <p className='box-data-title'>boletas Vendidas</p>
                <h5 className='box-data-price'>400</h5>
                <p className='box-data-text'>Numero de boletas vendidas por la plataforma</p>
            </Box>
            <Box className='box-data green'  sx={{mt:"20px"}}>
                <p className='box-data-title'>Boletas sin Vender</p>
                <h5 className='box-data-price'>1.200</h5>
                <p className='box-data-text'>Numero de boletas disponibles para la venta en la plataforma </p>
            </Box>
            <Grid container spacing={2} sx={{flex:"auto"}}>
                <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box className='box-data barchart' sx={{mt:"20px",flex:"auto !important"}}>
                        <p className='box-data-title black' style={{marginBottom:"30px"}}>Genero</p>
                        <Pie data={dataCircle} options={optionsCircle}/>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box className='box-data barchart' sx={{mt:"20px",flex:"auto !important"}}>
                        <p className='box-data-title black' style={{marginBottom:"30px"}}>Desempeño</p>
                        <Pie data={dataCircle2} options={optionsCircle}/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    </Box>
  )
}
