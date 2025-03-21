import { redirect } from "next/navigation";
import React from "react";

export default function EPage() {
  redirect("/analytics?packages=next%2Ctailwindcss%2Cmotion");
  return <></>;
}
