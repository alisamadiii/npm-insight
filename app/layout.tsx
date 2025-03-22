import { Geist, Geist_Mono } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { Metadata } from "next";

import { ThemeProvider } from "../providers/theme-provider";
import "./globals.css";
import QueryClientProviders from "@/providers/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NPM Insight",
    default: "NPM Insight",
  },
  description: "Analyze npm packages and their dependencies.",
  openGraph: {
    title: "NPM Insight",
    description: "Analyze npm packages and their dependencies.",
    url: "https://npminsight.com",
    siteName: "NPM Insight",
    images:
      "https://vztpjn0djt.ufs.sh/f/RAHCy45jEyblqZhJpQN1opnm0cGA2WENXaT1iRdxvljwrkbe",
  },
  icons: {
    other: [
      {
        rel: "mask-icon",
        url: "/",
        color: "#ffffff",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <QueryClientProviders>
          <PlausibleProvider domain="npminsight.com">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </PlausibleProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
