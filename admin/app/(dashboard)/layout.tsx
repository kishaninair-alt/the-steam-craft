import Nav from "@/components/Nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </>
  );
}
