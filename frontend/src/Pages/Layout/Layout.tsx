import React from "react";

export default function Layout(props: any) {
  return (
    <>
      <div className=" min-h-screen">{props.children}</div>
    </>
  );
}
