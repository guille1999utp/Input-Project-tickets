import React from "react";
import Layout from "../components/Layout";
import {
  useMediaQuery,
} from "@mui/material";
///////////////////////////////////////////////////////////////////////////////////

export default function RegisterScreen() {
  const isDesktop = useMediaQuery("(min-width:600px)");
  return (
    <Layout title="QR producto">
    </Layout>
  );
}
