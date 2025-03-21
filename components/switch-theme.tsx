"use client";

import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useId } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SwitchTheme() {
  const id = useId();
  const { setTheme, theme } = useTheme();

  console.log({ theme });

  return (
    <Select
      defaultValue="1"
      onValueChange={(value) => setTheme(value)}
      value={theme}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
