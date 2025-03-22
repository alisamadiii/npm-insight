import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${
      params.slug.charAt(0).toUpperCase() + params.slug.slice(1)
    } - README Documentation`,
    description: `View README documentation for ${params.slug} npm package`,
    openGraph: {
      title: `${params.slug} - README Documentation`,
      description: `View README documentation for ${params.slug} npm package`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.slug} - README Documentation`,
      description: `View README documentation for ${params.slug} npm package`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
