"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetPackageInfo } from "@/lib/queries";
import Link from "next/link";
import {
  Users,
  HardDrive,
  Files,
  Scale,
  User,
  Globe,
  Package,
  Github,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

export function Chart03() {
  const { data, isPending } = useGetPackageInfo();

  console.log("data", data);

  return (
    <Card className="gap-4">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-3">
        <div className="flex flex-col gap-4">
          {data?.map((item, index) => (
            <PackageInfo key={index} data={item} isPending={isPending} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PackageInfo({
  data,
  isPending,
}: {
  data?: Partial<PackageInfo>;
  isPending: boolean;
}) {
  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {!isPending ? (
            <h2 className="text-xl font-semibold">{data?.name}</h2>
          ) : (
            <Skeleton className="h-7 w-40" />
          )}
          <Badge variant="secondary">v{data?.version}</Badge>
        </div>
        {!isPending ? (
          <p className="text-muted-foreground text-sm">{data?.description}</p>
        ) : (
          <Skeleton className="h-5 w-2/7" />
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Maintainers"
          value={data?.maintainers?.length || 0}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          label="Size"
          value={formatBytes(data?.dist?.unpackedSize || 0)}
          icon={<HardDrive className="h-4 w-4" />}
        />
        <StatCard
          label="Files"
          value={data?.dist?.fileCount || 0}
          icon={<Files className="h-4 w-4" />}
        />
        <StatCard
          label="License"
          value={data?.license || "N/A"}
          icon={<Scale className="h-4 w-4" />}
        />
      </div>

      {/* Maintainers Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Maintainers</h3>
        {!isPending ? (
          <div className="flex flex-wrap gap-2">
            {data?.maintainers?.map((maintainer) => (
              <MaintainerBadge key={maintainer.name} maintainer={maintainer} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
        )}
      </div>

      {/* Keywords Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Keywords</h3>
        {!isPending ? (
          <div className="flex flex-wrap gap-2">
            {data?.keywords?.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
        )}
      </div>

      {/* Links Section */}
      <div className="flex gap-4 pt-4 border-t">
        {data?.homepage && (
          <Link
            href={data?.homepage}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            target="_blank"
          >
            <Globe className="h-4 w-4" />
            Homepage
          </Link>
        )}
        {data?.repository?.url && (
          <Link
            href={formatGitUrl(data?.repository?.url)}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            target="_blank"
          >
            <Github className="h-4 w-4" />
            Repository
          </Link>
        )}
        <Link
          href={`https://www.npmjs.com/package/${data?.name}`}
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          target="_blank"
        >
          <Package className="h-4 w-4" />
          NPM
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-3 bg-muted/50 rounded-md space-y-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}

function formatGitUrl(url: string): string {
  // Remove git+ prefix if present
  url = url.replace(/^git\+/, "");

  // Convert git:// to https://
  url = url.replace(/^git:\/\//, "https://");

  // Remove .git suffix if present
  url = url.replace(/\.git$/, "");

  // Handle ssh format (git@github.com:user/repo)
  if (url.startsWith("git@")) {
    url = url.replace(/^git@([^:]+):(.+)$/, "https://$1/$2");
  }

  return url;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  // Return with consistent decimal places (1 decimal place)
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

async function checkGitHubProfile(username: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    return response.status === 200;
  } catch {
    return false;
  }
}

function MaintainerBadge({ maintainer }: { maintainer: { name: string } }) {
  const [profileUrl, setProfileUrl] = useState<string>(
    `https://www.npmjs.com/~${maintainer.name}`
  );

  useEffect(() => {
    const checkProfile = async () => {
      const exists = await checkGitHubProfile(maintainer.name);
      if (exists) {
        setProfileUrl(`https://github.com/${maintainer.name}`);
      }
    };
    checkProfile();
  }, [maintainer.name]);

  return (
    <Link href={profileUrl} target="_blank" className="inline-flex">
      <Badge
        variant="outline"
        className="flex items-center gap-1 hover:bg-muted cursor-pointer"
      >
        {profileUrl.includes("github") ? (
          <Github className="h-3 w-3" />
        ) : (
          <User className="h-3 w-3" />
        )}
        {maintainer.name}
      </Badge>
    </Link>
  );
}
