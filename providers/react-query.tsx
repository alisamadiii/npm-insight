"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const query = new QueryClient();

export default function QueryClientProviders({ children }: Props) {
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
