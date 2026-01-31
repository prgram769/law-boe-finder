"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { useState } from "react";

export default function() {
  const [date, setDate] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [sectionLength, setSectionLength] = useState(0);

  function fixDate(unfixedDate) {
    const newDate = unfixedDate.replaceAll("-", "");

    callToServer(newDate);
  }

  async function callToServer(date) {
    try {
      const response = await fetch(`/api/boe?date=${date}`);
      const data = await response.json();

      console.log(data);

      setIdentifier(data.sumario_diario.identificador);
      setSectionLength(data.seccion.length);
    } catch (error) {
      alert("Doesn't exist that entry");
    }
  }
  return (
    <main className="min-h-screen bg-[#222] font-sans">
      <section className="flex flex-1 justify-center">
        <Title text={"summary"} />
      </section>
      <section className="rounded px-2 py-2 m-2 flex justify-center">
        <form
          className="w-10/12 sm:w-1/4 px-2 py-2 bg-[#096999] border-gray-700 border-2 rounded-2xl flex justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input type={"date"} onChange={(e) => setDate(e.target.value)} />
          <Button className={"bg-[#116998] border-2 border-gray-700 rounded px-2 py-2"} text={"Send request"} onClick={() => fixDate(date)} />
        </form>
      </section>
      {sectionLength ? (
        <section className="">
          <p>{identifier}</p>
          <p>{sectionLength} Entries exist</p>
        </section>
      ) : null}{" "}
    </main>
  );
}
