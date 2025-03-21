"use client";

import { Label } from "@/components/ui/label";
import { Tag, TagInput } from "emblor";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";

export default function SearchBar() {
  const id = useId();
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const packages = searchParams.get("packages");

  const [exampleTags, setExampleTags] = useState<Tag[]>(
    packages
      ? packages
          .split(",")
          .map((packageName) => ({ id: packageName, text: packageName }))
      : []
  );

  return (
    <div className="py-8 border-b">
      <div className="max-w-sm">
        <Label htmlFor={id} className="mb-2 inline-block">
          Search packages
        </Label>
        <TagInput
          id={id}
          tags={exampleTags}
          setTags={(newTags) => {
            const searchParams = new URLSearchParams(window.location.search);
            if (newTags && newTags.length > 0) {
              searchParams.set(
                "packages",
                (Array.isArray(newTags) ? newTags : [])
                  .map((tag: Tag) => tag.text)
                  .join(",")
              );
            } else {
              searchParams.delete("packages");
            }
            window.history.pushState({}, "", `?${searchParams.toString()}`);
            setExampleTags(newTags);
          }}
          placeholder="Add a package name"
          styleClasses={{
            inlineTagsContainer:
              "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
            input: "w-full min-w-[80px] shadow-none px-2 h-7",
            tag: {
              body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
              closeButton:
                "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
            },
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
        />
      </div>
    </div>
  );
}
