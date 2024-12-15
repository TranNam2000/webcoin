import Image from "next/image";
import Login from "./login/page"
import Main  from "./main/page";
import Head from "./header/header";
import Bottom from "./bottom/bottom";
export default function Home() {
  return (
    <div>
      <Head/>
      <Main/>
      <Bottom/>
    </div>  
  );
}
