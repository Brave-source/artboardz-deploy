import Head from "next/head";
import CollectionBoard from '../components/Collections/CollectionBoard';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.querySelector("#main-layout");
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CollectionBoard />
    
    </>
       

       
  );
}
