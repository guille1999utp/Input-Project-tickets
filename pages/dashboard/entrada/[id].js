import { LayoutAdmin } from "../../../components/LayoutAdmin";
import Entrada from "../../../components/dashboard/Entrada";
import { useRouter } from "next/router";

export default function Entry() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LayoutAdmin>
      <Entrada id={id} />
    </LayoutAdmin>
  );
}
