import { CircularProgress, Alert, Box } from "@mui/material";
import Layout from "../components/Layout";
import client from "../utils/client";
import { useState, useEffect } from "react";
import Banner from "../components/indexPage/Banner.jsx";
import EventosDestacados from "../components/indexPage/EventoDestacado";
import Funciona from "../components/indexPage/Funciona";
export default function Home() {
  const [state, setState] = useState({
    eventos: [],
    error: "",
    loading: true,
  });

  const { loading, error, eventos } = state;

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

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Box display="inline">
          <Box>
            <Banner />
          </Box>
          <Box>
            <Funciona eventos={eventos} />
          </Box>
          <Box paddingTop={5}>
            <EventosDestacados eventos={eventos} />
          </Box>
        </Box>
      )}
    </Layout>
  );
}
