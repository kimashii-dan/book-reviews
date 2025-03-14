import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <hr />
      <main className="w-full min-h-screen">{children}</main>
    </div>
  );
}
