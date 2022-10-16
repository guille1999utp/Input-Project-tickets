import React, { useEffect,useContext,useState } from "react";
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
import axios from "axios";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import Image from "next/image";


function RegisterScreen({ params }) {
  const { id: orderId } = params;
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [Data, setData] = useState({})

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }

    const fetchOrder = async () => {
      try {
        const data  = await axios.get(`/api/orders/QR/${orderId}`, {
          headers: { authorization: `${userInfo.token}` },
        });
        console.log(data);
        if(data){
          setData(data[0])
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [])
  return (
    <Layout title="QR producto">
      <Image  
        src={Data.imageQR}
        alt="imageQr"
        width={50}
        height={50}/>
    </Layout>
  );
}


export function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(RegisterScreen), { ssr: false });
