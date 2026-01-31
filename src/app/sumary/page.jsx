"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { useState } from "react";

export default function() {
  const [date, setDate] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [sectionLength, setSectionLength] = useState(0);
  const [sectionName, setSectionName] = useState(0);
  const [entryNumber, setEntry] = useState(0);

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

      if (!entryNumber) {
        setSectionName(data.seccion[entryNumber].nombre);
        console.log(sectionName);
      }
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
          <Input
            type={"date"}
            className={
              "border-2 border-gray-700 rounded sm:w-10/12 px-2 py-2 m-2"
            }
            onChange={(e) => setDate(e.target.value)}
          />
          <Button
            className={
              "bg-[#116998] border-2 border-gray-700 rounded px-2 py-2"
            }
            text={"Send request"}
            onClick={() => fixDate(date)}
          />
        </form>
      </section>
      {sectionLength ? (
        <section className="flex justify-center">
          <div className="border-2 sm:w-1/4 w-10/12 text-center border-gray-700 bg-[#116998] rounded-2xl">
            <div className="flex flex-col justify-center px-2 py-2 mb-2 border-b-2">
              <p>{identifier}</p>
              <p>{sectionLength} Entries exist</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>Choose one of these {sectionLength} entries</p>
              <div className="flex justify-center m-2 border-b-2">
                <Input
                  type={"number"}
                  className={
                    "px-2 py-2 text-center border-gray-700 border-2 m-2 sm:w-10/12 rounded w-1/2"
                  }
                  text={"Enter the entry"}
                  onChange={(e) => setEntry(e.target.value)}
                />
                <Button
                  className={
                    "rounded sm:w-10/12 border-2 w-1/2 border-gray-700 m-2 px-2 py-2"
                  }
                  text={"View entry"}
                  onClick={() => callToServer()}
                />
              </div>
              {sectionName ? (
                <div>
                  <p>{sectionName}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}{" "}
    </main>
  );
}
