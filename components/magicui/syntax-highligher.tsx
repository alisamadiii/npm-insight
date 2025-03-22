"use client";

import { CheckIcon, CopyIcon, FileIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CodeComparisonProps {
  code: string;
  language?: string;
  filename?: string;
  lightTheme?: string;
  darkTheme?: string;
}

export function SyntaxHighlighter({
  code,
  language = "bash",
  filename,
  lightTheme = "github-light",
  darkTheme = "github-dark",
}: CodeComparisonProps) {
  const { theme, systemTheme } = useTheme();
  const [highlighted, setHighlighted] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const selectedTheme = currentTheme === "dark" ? darkTheme : lightTheme;

    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: selectedTheme,
        });
        setHighlighted(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlighted(`<pre>${code}</pre>`);
      }
    }
    highlightCode();
  }, [theme, systemTheme, code, language, lightTheme, darkTheme]);

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          className="h-full overflow-auto bg-background font-mono text-sm [&>pre]:p-4 [&>pre]:h-full [&>pre]:!bg-transparent [&_code]:break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    } else {
      return (
        <pre className="h-full overflow-auto break-all bg-background font-mono text-sm p-4 text-foreground">
          {/* {code} */}
        </pre>
      );
    }
  };

  return (
    <div className="border rounded-xl relative overflow-hidden">
      {filename && (
        <div className="flex items-center bg-accent p-2 text-sm text-foreground">
          <FileIcon className="mr-2 h-4 w-4" />
          {filename}
        </div>
      )}
      {renderCode(code, highlighted)}

      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 text-foreground *:duration-200"
        disabled={copied}
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 2000);
        }}
      >
        <CheckIcon
          className={cn(
            "h-4 w-4 absolute",
            copied ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )}
        />
        <CopyIcon
          className={cn(
            "h-4 w-4 absolute",
            copied ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        />
      </Button>
    </div>
  );
}
