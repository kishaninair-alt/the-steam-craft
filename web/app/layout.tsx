import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Steam Craft — Kerala idli & chutney, steamed fresh in Ahmedabad",
  description:
    "Steamed idli with tomato-coconut chutney, and idli batter by the kilo. Made fresh, cooked to order, from a Kerala family that has called Ahmedabad home for generations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
