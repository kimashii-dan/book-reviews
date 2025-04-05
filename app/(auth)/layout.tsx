export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#0d0f15]">
      {children}
    </div>
  );
}
