"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/title";
import { useState } from "react";

export default function() {
  const [date, setDate] = useState("");

  function fixDate(unfixedDate) {
    const newDate = unfixedDate.replaceAll("-", "");

    callToServer(newDate);
  }

  async function callToServer(date) {
    try {
      const response = await fetch(`/api/boe?date=${date}`);
      const data = await response.json();

      console.log(data);
    } catch (error) {
      alert("Doesn't exist that entry");
    }
  }
  return (
    <main className="min-h-screen bg-[#222] font-sans">
      <section className="flex flex-1 justify-center">
        <Title text={"summary"} />
      </section>
      <section>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type={"date"}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button text={"Send request"} onClick={() => fixDate(date)} />
        </form>
      </section>
    </main>
  );
}
