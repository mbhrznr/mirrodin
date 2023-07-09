import type { Metadata } from "next";

import Header from "~/components/header/header";
import "~/styles/global.css";
import "~/styles/variables.css";

export const metadata = {
  applicationName: "mirrodin",
  description: "mirrodin - a redis powered markdown search engine",
  title: {
    default: "mirrodin",
    template: "%s - mirrodin",
  },
  viewport: "width=device-width, initial-scale=1",
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
