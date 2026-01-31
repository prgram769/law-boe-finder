"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { useState } from "react";

export default function() {
  const [date, setDate] = useState("");
  const [boeCall, setBoeCall] = useState({
    identifier: "",
    sectionLength: 0,
    sectionName: "",
    department: "",
    pdfUrl: "",
  });
  const [entryNumber, setEntry] = useState(0);

  function fixDate(unfixedDate) {
    const newDate = unfixedDate.replaceAll("-", "");

    callToServer(newDate);
  }

  async function callToServer(date) {
    try {
      const response = await fetch(`/api/boe?date=${date}`);
      const data = await response.json();

      setBoeCall({
        identifier: data.sumario_diario.identificador,
        sectionLength: data.seccion.length,
        sectionName: data.seccion[entryNumber].nombre,
        department: data.seccion[entryNumber].departamento.nombre,
        pdfUrl: data.sumario_diario.url_pdf.texto,
      });
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
      {boeCall.sectionLength ? (
        <section className="flex justify-center">
          <div className="border-2 sm:w-1/4 w-10/12 text-center border-gray-700 bg-[#116998] rounded-2xl">
            <div className="flex flex-col justify-center px-2 py-2 mb-2 border-b-2">
              <p>{boeCall.identifier}</p>
              <p>{boeCall.sectionLength} Entries exist</p>
            </div>
            <div className="flex flex-col justify-center">
              <p>Choose one of these {boeCall.sectionLength} entries</p>
              <div className="flex justify-center m-2 border-b-2">
                <Input
                  max={boeCall.sectionLength - 1}
                  type={"number"}
                  className={
                    "px-2 py-2 text-center border-gray-700 border-2 m-2 sm:w-10/12 rounded w-1/2"
                  }
                  text={"Enter the entry"}
                  onChange={(e) => setEntry(Number(e.target.value))}
                />
                <Button
                  className={
                    "rounded sm:w-10/12 border-2 w-1/2 border-gray-700 m-2 px-2 py-2"
                  }
                  text={"View entry"}
                  onClick={() => fixDate(date)}
                />
              </div>
              <div className="">
                <div className="flex flex-col justify-center items-center border-b-2 m-2">
                  <p>{boeCall.sectionName}</p>
                  <p>{boeCall.department}</p>
                </div>
                <div className="text-center m-2">
                  <p>
                    <a
                      className="text-blue-900 checked:text-gray-200"
                      target="_blank"
                      rel="noopener"
                      href={boeCall.pdfUrl}
                    >
                      PDF URL
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}{" "}
    </main>
  );
}
