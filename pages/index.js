import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Main({ children }){
  return(
    <>
      <LayoutComponent 
        metaTitle={"Home"}
      >
        <p>Home</p>
      </LayoutComponent>
    </>
  );
}