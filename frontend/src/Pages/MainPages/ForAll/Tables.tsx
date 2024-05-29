import React from "react";
import TableHeader from "../components/Table/TableHeader";
import TableCore from "../components/Table/TableCore";

export default function Tables() {
  return (
    <>
      <div className="min-h-screen">
        <header className="flex justify-center items-center flex-col m-auto lg:w-[35%] text-center gap-5 mb-[50px]">
          <TableHeader/>
        </header>
        <section>
          <TableCore/>
        </section>
      </div>
    </>
  );
}
