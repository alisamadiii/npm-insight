"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import rehypeRaw from "rehype-raw";

import { SyntaxHighlighter } from "@/components/magicui/syntax-highligher";
import { cn } from "@/lib/utils";
import { getReadme } from "@/lib/action";
import { Skeleton } from "@/components/ui/skeleton";

export default function Docs() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isPending, isError } = useQuery({
    queryKey: ["docs", slug],
    queryFn: async () => {
      try {
        if (!slug) {
          throw new Error("Name is required");
        }

        const res = await getReadme(slug);

        if (res.error) {
          throw new Error(res.error);
        }

        return res.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!slug,
  });

  console.log({ data });

  return isPending ? (
    <div className="py-12 h-full w-full space-y-4 prose mx-auto">
      <Skeleton className="h-8 w-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="aspect-video w-full" />
    </div>
  ) : isError ? (
    <div className="flex h-full w-full items-center justify-center">
      <p>Error</p>
    </div>
  ) : (
    <div
      className={cn(
        "prose dark:prose-invert mx-auto py-12",
        // Paragraph
        "prose-p:text-muted-foreground",
        // Code
        "prose-code:after:hidden prose-code:before:hidden",
        // pre
        "prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:border-0 prose-pre:rounded-none",
        // List
        "prose-li:text-muted-foreground"
      )}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeAutolinkHeadings], [rehypeSlug], [rehypeRaw]]}
        components={{
          code({ className, children, ...props }) {
            const match = className?.match(/language-([\w-]+)/);
            console.log({ match });
            return match ? (
              <SyntaxHighlighter
                code={String(children).replace(/\n$/, "")}
                // language={"typescript"}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {data}
      </Markdown>
    </div>
  );
}
