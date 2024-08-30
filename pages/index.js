import Image from "next/image";
import { useEffect } from "react";
import dynamic from "next/dynamic";

export default function Main({ children }){

  const LayoutComponent = dynamic(() => import("@/layout"))

  useEffect(() => {
    fetch("/api/hello")
    .then((res) => res.json())
    .then((res) => console.log("response => ", res))
    .catch((err) => console.log("error => ", err))
  }, []);

  return(
    <>
      <LayoutComponent 
        metaTitle={"Home"}
      >
        <p>Home</p>
        <Image src={"/logo-juku.png"} width={400} height={400} alt="Logo Image"/>
        <img src="/logo-juku.png" style={{width: 400, height: 400}} alt="Logo Image"/>
      </LayoutComponent>
    </>
  );
}