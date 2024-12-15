import Image from "next/image";
import Login from "./login/page"
import Main  from "./main/page";
import Bottom from "./bottom/bottom";
export default function Home() {
  return (
    <div>
      <Main/>
      <Bottom/>
    </div>  
  );
}
