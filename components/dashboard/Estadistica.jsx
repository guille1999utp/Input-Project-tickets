import { Box, Grid } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Store } from "../../utils/Store";
import { Bar, Pie } from "react-chartjs-2";
import format from 'date-fns/format'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import client from "../../utils/client";
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
      display: false,
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
  },
};

const optionsCircle = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const dataCircle2 = {
  labels: ["Preventa", "Taquilla"],
  datasets: [
    {
      label: "",
      data: [15, 25],
      backgroundColor: ["rgba(52, 121, 251, 1)", "rgba(109, 180, 246, 1)"],
      borderColor: ["rgba(52, 121, 251, 1)", "rgba(109, 180, 246, 1)"],
      borderWidth: 1,
    },
  ],
};
export const Estadistica = ({ idEvento }) => {
  const [Estadist, setData] = useState([]);
  const [Event, setEvent] = useState([]);
  const [Orders, setOrders] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          "/api/users/estadisReferent",
          { idEvento },
          {
            headers: { authorization: `${userInfo.token}` },
          }
        );

        const evento = await client.fetch(
          `*[_type == 'eventos'&& _id == "${idEvento}"]`
        );
        const orders = await client.fetch(
          `*[_type == 'order' && evento._ref == "${idEvento}" && paymentResult == "accredited"]`
        );
        setEvent(evento);
        setData(data);
        setOrders(orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idEvento]);

  const dataCircle = {
    labels: ["mujer", "hombres"],
    datasets: [
      {
        label: "",
        data: [
          Estadist.filter((val) => val.genero.toLowerCase() === "femenino")
            .length,
          Estadist.filter((val) => val.genero.toLowerCase() === "masculino")
            .length,
        ],
        backgroundColor: ["rgba(255, 145, 76, 1)", "rgba(254, 189, 89, 1)"],
        borderColor: ["rgba(255, 145, 76, 1)", "rgba(254, 189, 89, 1)"],
        borderWidth: 1,
      },
    ],
  };


  const labels = [1,2,3,4,5,6,7].map(( _ ,i) => {
    let date = new Date();
    date.setDate(date.getDate() - i);
     return  format(date, "dd/MM")
   }).reverse();
  const data = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: [
          Orders.filter((val) => {
            let dateOld = new Date(val.dayPay);
            dateOld = new Date(dateOld.getFullYear(),dateOld.getMonth(),dateOld.getDate());
            let dateCurrent = new Date();
            dateCurrent = new Date(dateCurrent.getFullYear(),dateCurrent.getMonth(),dateCurrent.getDate());
            const diff = parseInt((dateCurrent.getTime() - dateOld.getTime())/(1000*60*60*24));
            
           if( diff === 6){
            return val
           }
          }).length,
          Orders.filter((val) => {
            let dateOld = new Date(val.dayPay);
            dateOld = new Date(dateOld.getFullYear(),dateOld.getMonth(),dateOld.getDate());
            let dateCurrent = new Date();
            dateCurrent = new Date(dateCurrent.getFullYear(),dateCurrent.getMonth(),dateCurrent.getDate());
            const diff = parseInt((dateCurrent.getTime() - dateOld.getTime())/(1000*60*60*24));
            if( diff === 5){
             return val
            }
           }).length,
           Orders.filter((val) => {
            let dateOld = new Date(val.dayPay);
            dateOld = new Date(dateOld.getFullYear(),dateOld.getMonth(),dateOld.getDate());
            let dateCurrent = new Date();
            dateCurrent = new Date(dateCurrent.getFullYear(),dateCurrent.getMonth(),dateCurrent.getDate());
            const diff = parseInt((dateCurrent.getTime() - dateOld.getTime())/(1000*60*60*24));
            if( diff === 4){
             return val
            }
           }).length,
           Orders.filter((val) => {
            let dateOld = new Date(val.dayPay);
            dateOld = new Date(dateOld.getFullYear(),dateOld.getMonth(),dateOld.getDate());
            let dateCurrent = new Date();
            dateCurrent = new Date(dateCurrent.getFullYear(),dateCurrent.getMonth(),dateCurrent.getDate());
            const diff = parseInt((dateCurrent.getTime() - dateOld.getTime())/(1000*60*60*24));
            if( diff === 3){
             return val
            }
           }).length,
           Orders.filter((val) => {
            let dateOld = new Date(val.dayPay);
            dateOld = new Date(dateOld.getFullYear(),dateOld.getMonth(),dateOld.getDate());
            let dateCurrent = new Date();
            dateCurrent = new Date(dateCurrent.getFullYear(),dateCurrent.getMonth(),dateCurrent.getDate());
            const diff = parseInt((dateCurrent.getTime() - dateOld.getTime())/(1000*60*60*24));
            if( diff === 2){
             return val
            }
           }).length,
           Orders.filter((val) => {
            let dateOld = new Date(val.dayPay);
            dateOld = new Date(dateOld.toLocaleDateString());
            let dateCurrent = new Date();
            dateCurrent = new Date(dateCurrent.toLocaleDateString());
            const diff = parseInt((dateCurrent - dateOld)/(1000*60*60*24));
            if( diff === 1){
             return val
            }
           }).length,
           Orders.filter((val) => {
            let dateOld = new Date(val.dayPay);
            console.log(dateOld.getFullYear(),dateOld.getMonth(),dateOld.getDate())
            dateOld = new Date(dateOld.getFullYear(),dateOld.getMonth(),dateOld.getDate());
            let dateCurrent = new Date();
            dateCurrent = new Date(dateCurrent.getFullYear(),dateCurrent.getMonth(),dateCurrent.getDate());
            const diff = parseInt((dateCurrent.getTime() - dateOld.getTime())/(1000*60*60*24));
            if( diff === 0){
             return val
            }
           }).length,
        ],
        backgroundColor: "rgba(140, 82, 255, 1)",
      },
    ],
  };
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
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column",minWidth:"320px",margin:'auto' }}>
          <Box className="box-data blue">
            <p className="box-data-title">Ingresos Totales</p>
            <h5 className="box-data-price">
              $
              {new Intl.NumberFormat().format(
                parseInt(Orders.map((o) => o.price).reduce((a, b) => a + b, 0))
              )}
            </h5>
            <p className="box-data-text">
              Dinero obtenido por la venta de boletas
            </p>
          </Box>
          <Box className="box-data purple" sx={{ mt: "20px" }}>
            <p className="box-data-title">Dinero Desembolsado</p>
            <h5 className="box-data-price">$1.000.000</h5>
            <p className="box-data-text">
              Dinero entregado por parte de la Ticketera
            </p>
          </Box>
          <Box className="box-data barchart" sx={{ mt: "20px" }}>
            <p className="box-data-title black">Desempeño de Ventas por dia</p>
            <Bar options={options} data={data} />
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column",minWidth:"320px",margin:{xs:"auto",sm:"0px"} }}>
          <Box className="box-data sky">
            <p className="box-data-title">boletas Vendidas</p>
            <h5 className="box-data-price">
              {new Intl.NumberFormat().format(
                parseInt(Event[0]?.ticketVendidos)
              )}
            </h5>
            <p className="box-data-text">
              Numero de boletas vendidas por la plataforma
            </p>
          </Box>
          <Box className="box-data green" sx={{ mt: "20px" }}>
            <p className="box-data-title">Boletas sin Vender</p>
            <h5 className="box-data-price">
              {new Intl.NumberFormat().format(
                parseInt(Event[0]?.totalTickets - Event[0]?.ticketVendidos)
              )}
            </h5>
            <p className="box-data-text">
              Numero de boletas disponibles para la venta en la plataforma{" "}
            </p>
          </Box>
          <Grid container spacing={2} sx={{ flex: "auto", flexDirection:{xs:"column",sm:"row"}}}>
            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column",maxWidth:{xs:"100%",sm:"50%"} }}>
              <Box
                className="box-data barchart"
                sx={{ mt: "20px", flex: "auto !important" }}
              >
                <p
                  className="box-data-title black"
                  style={{ marginBottom: "30px" }}
                >
                  Genero
                </p>
                <Pie data={dataCircle} options={optionsCircle} />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column",maxWidth:{xs:"100%",sm:"50%"} }}>
              <Box
                className="box-data barchart"
                sx={{ mt: "20px", flex: "auto !important" }}
              >
                <p
                  className="box-data-title black"
                  style={{ marginBottom: "30px" }}
                >
                  Desempeño
                </p>
                <Pie data={dataCircle2} options={optionsCircle} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
