import Header from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <hr />
      <main className="w-full h-screen">{children}</main>
    </div>
  );
}
