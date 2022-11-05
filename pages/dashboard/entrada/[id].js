import { LayoutAdmin } from "../../../components/LayoutAdmin";
import Entrada from "../../../components/dashboard/Entrada";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function Entry() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LayoutAdmin>
      <Entrada id={id}/>
    </LayoutAdmin>
  );
}
