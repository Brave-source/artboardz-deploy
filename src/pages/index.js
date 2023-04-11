import Head from "next/head";
import Login from '../components/Login/Login';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.querySelector("#main-layout");
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" href="/defaultProfile.png" />
      </Head>
      <Login />
    
    </>
       

       
  );
}
