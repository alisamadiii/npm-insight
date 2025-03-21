"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { format, subDays } from "date-fns";

import { getDownloads, getDownloadsRange, getPackageInfo } from "./action";

export function useGetPackageInfo() {
  const searchParams = useSearchParams();
  const packagesParam = searchParams.get("packages");

  // Memoize these values to prevent unnecessary re-renders
  const packages = useMemo(
    () => (packagesParam ? packagesParam.split(",") : []),
    [packagesParam]
  );

  const queries = useQueries({
    queries: packages.map((pkg) => ({
      queryKey: ["package-info", pkg],
      queryFn: async () => {
        if (!pkg) {
          throw new Error("No package provided");
        }

        const res = await getPackageInfo(pkg);

        if (res.error) {
          throw new Error(res.error);
        }

        return res.data;
      },
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false,
      enabled: !!pkg,
    })),
  });

  return {
    data: queries.map((query) => query.data),
    isPending: queries.every((query) => query.isPending),
  };
}

export function useGetDownloads() {
  const searchParams = useSearchParams();
  const packagesParam = searchParams.get("packages");
  const dateParam = searchParams.get("date");

  const dates = useMemo(() => {
    if (!dateParam) {
      const today = new Date();
      return {
        start: subDays(today, 6),
        end: today,
      };
    }
    const [start, end] = dateParam.split(" to ");
    return {
      start: new Date(start),
      end: new Date(end),
    };
  }, [dateParam]);

  // Memoize these values to prevent unnecessary re-renders
  const packages = useMemo(
    () => (packagesParam ? packagesParam.split(",") : []),
    [packagesParam]
  );

  const queries = useQueries({
    queries: packages.map((pkg) => ({
      queryKey: [
        "downloads",
        pkg,
        format(dates.start, "yyyy-MM-dd"),
        format(dates.end, "yyyy-MM-dd"),
      ],
      queryFn: async () => {
        if (!dates.start || !dates.end || !pkg) {
          return { downloads: 0, package: pkg };
        }

        const res = await getDownloads(
          pkg,
          format(dates.start, "yyyy-MM-dd"),
          format(dates.end, "yyyy-MM-dd")
        );

        if (res.error) {
          return { downloads: 0, package: pkg };
        }

        return res.data;
      },
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false,
      enabled: !!dates.start && !!dates.end && !!pkg,
    })),
  });

  return {
    data: queries
      .map((query) => query.data)
      .reduce((acc, curr, index) => {
        if (curr?.package) {
          acc[curr.package] = {
            downloads: curr.downloads,
            label: curr.package,
            color: `var(--chart-custom-${index + 1})`,
          };
        }
        return acc;
      }, {} as Record<string, { downloads: number; label: string; color: string }>),
    isPending: queries.every((query) => query.isPending),
  };
}

export function useGetDownloadsRange() {
  const searchParams = useSearchParams();
  const packagesParam = searchParams.get("packages");
  const dateParam = searchParams.get("date");

  const dates = useMemo(() => {
    if (!dateParam) {
      const today = new Date();
      return {
        start: subDays(today, 6),
        end: today,
      };
    }
    const [start, end] = dateParam.split(" to ");
    return {
      start: new Date(start),
      end: new Date(end),
    };
  }, [dateParam]);

  // Memoize these values to prevent unnecessary re-renders
  const packages = useMemo(
    () => (packagesParam ? packagesParam.split(",") : []),
    [packagesParam]
  );

  console.log("packages", dates, packages);

  const queries = useQueries({
    queries: packages.map((pkg) => ({
      queryKey: [
        "downloads-range",
        pkg,
        format(dates.start, "yyyy-MM-dd"),
        format(dates.end, "yyyy-MM-dd"),
      ],
      queryFn: async () => {
        if (!dates.start || !dates.end || !pkg) {
          return { downloads: [], package: pkg };
        }

        const res = await getDownloadsRange(
          pkg,
          format(dates.start, "yyyy-MM-dd"),
          format(dates.end, "yyyy-MM-dd")
        );

        if (res.error) {
          return { downloads: [], package: pkg };
        }

        return res.data;
      },
      staleTime: 1000 * 60 * 60, // 1 hour
      retry: false,
      enabled: !!dates.start && !!dates.end && !!pkg,
    })),
  });

  const data = queries
    .map((query) => query.data)
    .filter(Boolean)
    .reduce((acc, curr) => {
      curr?.downloads.forEach((download) => {
        // Create entry without the date as key
        const dayData = acc[download.day] || { day: download.day };
        // Add the package's downloads
        dayData[curr.package] = download.downloads;
        acc[download.day] = dayData;
      });
      return acc;
    }, {} as Record<string, { day: string; [key: string]: number | string }>);

  // Convert to array and sort by date
  const chartData = Object.values(data).sort(
    (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
  );

  return {
    data: chartData,
    isPending: queries.every((query) => query.isPending),
  };
}
