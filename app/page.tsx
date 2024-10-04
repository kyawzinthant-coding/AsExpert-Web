import MainTopBar from "@/components/MainTopBar/MainTopBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-12">
      <div className="flex flex-row items-center">
        <MainTopBar />
      </div>
    </div>
  );
}
