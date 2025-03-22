"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Search() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const slug = formData.get("slug");
        router.push(`/readme/${slug}`);
      }}
      className="my-4"
    >
      <Input type="text" name="slug" placeholder="Search" />
    </form>
  );
}
