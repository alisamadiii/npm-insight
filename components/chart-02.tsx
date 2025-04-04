"use client";

import { useId, useState, useEffect, useMemo } from "react";
import NumberFlow from "@number-flow/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { CustomTooltipContent } from "@/components/charts-extra";
import { useGetDownloads, useGetDownloadsRange } from "@/lib/queries";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

const chartDataValue = [
  {
    day: "2025-01-01",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-02",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-03",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-04",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-05",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-06",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-07",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-08",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-09",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-10",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-11",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
  {
    day: "2025-01-12",
    motion: Math.floor(Math.random() * 70000),
    next: Math.floor(Math.random() * 70000),
    react: Math.floor(Math.random() * 70000),
    axios: Math.floor(Math.random() * 70000),
    sonner: Math.floor(Math.random() * 70000),
  },
];

interface CustomCursorProps {
  fill?: string;
  pointerEvents?: string;
  height?: number;
  points?: Array<{ x: number; y: number }>;
  className?: string;
}

function CustomCursor(props: CustomCursorProps) {
  const { fill, pointerEvents, height, points, className } = props;

  if (!points || points.length === 0) {
    return null;
  }

  const { x, y } = points[0]!;
  return (
    <>
      <Rectangle
        x={x - 12}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={24}
        height={height}
        className={className}
        type="linear"
      />
      <Rectangle
        x={x - 1}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={1}
        height={height}
        className="recharts-tooltip-inner-cursor"
        type="linear"
      />
    </>
  );
}

export function Chart02() {
  const [downloads, setDownloads] = useState<number>(0);

  const [showChart, setShowChart] = useState<boolean>(false);

  const id = useId();

  const { data, isPending } = useGetDownloads();
  const { data: rangeData, isPending: rangeIsPending } = useGetDownloadsRange();

  useEffect(() => {
    if (data && !isPending) {
      setDownloads(
        Object.values(data).reduce(
          (acc, curr) => acc + (curr?.downloads || 0),
          0
        )
      );
    }
  }, [data, isPending]);

  useEffect(() => {
    if (rangeData && !rangeIsPending) {
      setTimeout(() => {
        setShowChart(true);
      }, 200);
    }
  }, [rangeData, rangeIsPending]);

  const weeklyData = useMemo(() => {
    if (!rangeData) return [];

    const weeklyAggregates: Record<string, any> = {};

    rangeData.forEach((dayData: any) => {
      // Get the week start date (Sunday)
      const date = new Date(dayData.day);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split("T")[0];

      if (!weeklyAggregates[weekKey]) {
        weeklyAggregates[weekKey] = {
          day: weekKey,
          ...Object.keys(dayData)
            .filter((key) => key !== "day")
            .reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
        };
      }

      // Sum up all the values for each package
      Object.keys(dayData).forEach((key) => {
        if (key !== "day") {
          weeklyAggregates[weekKey][key] += dayData[key];
        }
      });
    });

    return Object.values(weeklyAggregates);
  }, [rangeData]);

  const monthlyData = useMemo(() => {
    if (!rangeData) return [];

    const monthlyAggregates: Record<string, any> = {};

    rangeData.forEach((dayData: any) => {
      const date = new Date(dayData.day);
      const monthKey = date.toISOString().split("T")[0].slice(0, 7);

      if (!monthlyAggregates[monthKey]) {
        monthlyAggregates[monthKey] = {
          day: monthKey,
          ...Object.keys(dayData)
            .filter((key) => key !== "day")
            .reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
        };
      }

      Object.keys(dayData).forEach((key) => {
        if (key !== "day") {
          monthlyAggregates[monthKey][key] += dayData[key];
        }
      });
    });

    return Object.values(monthlyAggregates);
  }, [rangeData]);

  const yearlyData = useMemo(() => {
    if (!rangeData) return [];

    const yearlyAggregates: Record<string, any> = {};

    rangeData.forEach((dayData: any) => {
      const date = new Date(dayData.day);
      const yearKey = date.toISOString().split("T")[0].slice(0, 4);

      if (!yearlyAggregates[yearKey]) {
        yearlyAggregates[yearKey] = {
          day: yearKey,
          ...Object.keys(dayData)
            .filter((key) => key !== "day")
            .reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
        };
      }

      Object.keys(dayData).forEach((key) => {
        if (key !== "day") {
          yearlyAggregates[yearKey][key] += dayData[key];
        }
      });
    });

    return Object.values(yearlyAggregates);
  }, [rangeData]);

  console.log(weeklyData);

  return (
    <Card className="gap-4">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle>Downloads</CardTitle>
            <div className="flex items-start gap-2">
              <div className="font-semibold text-2xl">
                <NumberFlow value={downloads} />
              </div>
              {/* <Badge className="mt-1.5 bg-emerald-500/24 text-emerald-500 border-none">
                +24.7%
              </Badge> */}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {Object.values(data).map((item, index) => (
              <TooltipProvider key={`${item?.label}-${index}-header-text`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      key={`${item?.label}-${index}-header-text`}
                      className="flex items-center gap-2"
                    >
                      <div
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-xs"
                        style={{
                          backgroundColor: item?.color,
                        }}
                      ></div>
                      <div className="text-[13px]/3 text-muted-foreground/50">
                        {item?.label}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item?.downloads?.toLocaleString()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={data}
          className="aspect-auto h-60 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/15 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-white/20"
        >
          {showChart ? (
            <LineChart
              accessibilityLayer
              data={rangeData}
              margin={{ left: -12, right: 12, top: 12 }}
            >
              <defs>
                <linearGradient
                  id={`${id}-gradient`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--chart-2)" />
                  <stop offset="100%" stopColor="var(--chart-1)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="2 2"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 10)}
                stroke="var(--border)"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => {
                  if (value === 0) return "$0";
                  if (value >= 1000000000)
                    return `${(value / 1000000000).toFixed(1)}b`;
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(1)}m`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                  return `${value}`;
                }}
                interval="preserveStartEnd"
              />
              <ChartTooltip
                content={
                  <CustomTooltipContent
                    colorMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.color;
                      return acc;
                    }, {} as Record<string, string>)}
                    labelMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.label;
                      return acc;
                    }, {} as Record<string, string>)}
                    dataKeys={Object.values(data).map((item) => item?.label)}
                    valueFormatter={(value) => `${value.toLocaleString()}`}
                  />
                }
                cursor={<CustomCursor fill="var(--chart-1)" />}
              />
              {Object.values(data).map((item, index) => (
                <Line
                  key={`${item?.label}-${index}-line`}
                  type="linear"
                  dataKey={item?.label}
                  stroke={item?.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: item?.color,
                    stroke: "var(--background)",
                    strokeWidth: 2,
                  }}
                />
              ))}
            </LineChart>
          ) : (
            <div></div>
          )}
        </ChartContainer>
      </CardContent>
      <Separator className="mt-4" />
      <CardContent>
        <h3 className="text-lg font-medium mb-4">Weekly</h3>
        <ChartContainer
          config={data}
          className="aspect-auto h-60 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/15 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-white/20"
        >
          {showChart ? (
            <LineChart
              accessibilityLayer
              data={weeklyData}
              margin={{ left: -12, right: 12, top: 12 }}
            >
              <defs>
                <linearGradient
                  id={`${id}-gradient`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--chart-2)" />
                  <stop offset="100%" stopColor="var(--chart-1)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="2 2"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 10)}
                stroke="var(--border)"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => {
                  if (value === 0) return "$0";
                  if (value >= 1000000000)
                    return `${(value / 1000000000).toFixed(1)}b`;
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(1)}m`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                  return `${value}`;
                }}
                interval="preserveStartEnd"
              />
              <ChartTooltip
                content={
                  <CustomTooltipContent
                    colorMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.color;
                      return acc;
                    }, {} as Record<string, string>)}
                    labelMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.label;
                      return acc;
                    }, {} as Record<string, string>)}
                    dataKeys={Object.values(data).map((item) => item?.label)}
                    valueFormatter={(value) => `${value.toLocaleString()}`}
                  />
                }
                cursor={<CustomCursor fill="var(--chart-1)" />}
              />
              {Object.values(data).map((item, index) => (
                <Line
                  key={`${item?.label}-${index}-line-weekly`}
                  type="linear"
                  dataKey={item?.label}
                  stroke={item?.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: item?.color,
                    stroke: "var(--background)",
                    strokeWidth: 2,
                  }}
                />
              ))}
            </LineChart>
          ) : (
            <div></div>
          )}
        </ChartContainer>
      </CardContent>
      <Separator className="mt-4" />
      <CardContent>
        <h3 className="text-lg font-medium mb-4">Monthly</h3>
        <ChartContainer
          config={data}
          className="aspect-auto h-60 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/15 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-white/20"
        >
          {showChart ? (
            <LineChart
              accessibilityLayer
              data={monthlyData}
              margin={{ left: -12, right: 12, top: 12 }}
            >
              <defs>
                <linearGradient
                  id={`${id}-gradient`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--chart-2)" />
                  <stop offset="100%" stopColor="var(--chart-1)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="2 2"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 10)}
                stroke="var(--border)"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => {
                  if (value === 0) return "$0";
                  if (value >= 1000000000)
                    return `${(value / 1000000000).toFixed(1)}b`;
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(1)}m`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                  return `${value}`;
                }}
                interval="preserveStartEnd"
              />
              <ChartTooltip
                content={
                  <CustomTooltipContent
                    colorMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.color;
                      return acc;
                    }, {} as Record<string, string>)}
                    labelMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.label;
                      return acc;
                    }, {} as Record<string, string>)}
                    dataKeys={Object.values(data).map((item) => item?.label)}
                    valueFormatter={(value) => `${value.toLocaleString()}`}
                  />
                }
                cursor={<CustomCursor fill="var(--chart-1)" />}
              />
              {Object.values(data).map((item, index) => (
                <Line
                  key={`${item?.label}-${index}-line-monthly`}
                  type="linear"
                  dataKey={item?.label}
                  stroke={item?.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: item?.color,
                    stroke: "var(--background)",
                    strokeWidth: 2,
                  }}
                />
              ))}
            </LineChart>
          ) : (
            <div></div>
          )}
        </ChartContainer>
      </CardContent>
      <Separator className="mt-4" />
      <CardContent>
        <h3 className="text-lg font-medium mb-4">Yearly</h3>
        <ChartContainer
          config={data}
          className="aspect-auto h-60 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/15 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-white/20"
        >
          {showChart ? (
            <LineChart
              accessibilityLayer
              data={yearlyData}
              margin={{ left: -12, right: 12, top: 12 }}
            >
              <defs>
                <linearGradient
                  id={`${id}-gradient`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="var(--chart-2)" />
                  <stop offset="100%" stopColor="var(--chart-1)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="2 2"
                stroke="var(--border)"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 10)}
                stroke="var(--border)"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => {
                  if (value === 0) return "$0";
                  if (value >= 1000000000)
                    return `${(value / 1000000000).toFixed(1)}b`;
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(1)}m`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                  return `${value}`;
                }}
                interval="preserveStartEnd"
              />
              <ChartTooltip
                content={
                  <CustomTooltipContent
                    colorMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.color;
                      return acc;
                    }, {} as Record<string, string>)}
                    labelMap={Object.values(data).reduce((acc, item) => {
                      acc[item?.label] = item?.label;
                      return acc;
                    }, {} as Record<string, string>)}
                    dataKeys={Object.values(data).map((item) => item?.label)}
                    valueFormatter={(value) => `${value.toLocaleString()}`}
                  />
                }
                cursor={<CustomCursor fill="var(--chart-1)" />}
              />
              {Object.values(data).map((item, index) => (
                <Line
                  key={`${item?.label}-${index}-line-yearly`}
                  type="linear"
                  dataKey={item?.label}
                  stroke={item?.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: item?.color,
                    stroke: "var(--background)",
                    strokeWidth: 2,
                  }}
                />
              ))}
            </LineChart>
          ) : (
            <div></div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
