import SearchComponent from "@/components/SearchComponent";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto gap-10 ">
      <SearchComponent />
      {children}
    </div>
  );
}
