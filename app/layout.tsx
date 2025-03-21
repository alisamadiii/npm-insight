import { Geist, Geist_Mono } from "next/font/google";
import PlausibleProvider from "next-plausible";

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
