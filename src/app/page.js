"use client";

import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function handleClick(place) {
    router.push(`/${place}`)
  }

  return (
    <main className="min-h-screen  bg-[#222] font-sans">
      <section className="flex flex-col items-center">
        <Image
          alt="BOE icon"
          width={16 * 10}
          height={16 * 10}
          className="rounded mt-2 m-2 sm:w-50 sm:h-40"
          src={"/boe.png"}
        />
        <Title text={"law boe finder"}/>
      </section>
      <section>
        <div className="flex sm:flex-row sm:justify-center flex-col items-center m-3">
          <Button
            text={"Summary"}
            className={"hover:animate-bounce bg-[#096999] rounded-2xl sm:w-auto w-1/3 text px-2 py-2 m-2"}
            onClick={() => handleClick("sumary")}
          />
        </div>
      </section>
    </main>
  );
}
