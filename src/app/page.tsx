import Image from "next/image";
import Login from "./login/login"
import Head from "./header/header";
import Bottom from "./bottom/bottom";
export default function Home() {
  return (
    <div className="bg-white">
      <Head/>
      <Login/>
      <Bottom/>
    </div>
  );
}
