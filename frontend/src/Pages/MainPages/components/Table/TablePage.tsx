import React from "react";
import TablePageItems from "./TablePageItems";
import TableHeader from "./TableHeader";

export default function TablePage() {
  return (
    <>
      <div>
        <TableHeader />
      </div>
      <div>
        <TablePageItems />
      </div>
    </>
  );
}
