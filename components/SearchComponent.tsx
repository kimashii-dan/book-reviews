import React from "react";
import { Input } from "./ui/input";

import { redirect } from "next/navigation";
import { SubmitButton } from "./SubmitButton";

export default function SearchComponent() {
  return (
    <div className="flex flex-row justify-between items-center w-full mt-10 mb-5">
      <div className="">
        <h1 className="text-4xl font-bold">Books</h1>
        {/* <p>Find any book you want</p> */}
      </div>

      <form
        className="flex flex-row gap-2 w-[43%]"
        action={async (formData) => {
          "use server";
          const search = formData.get("search");
          if (search) {
            redirect(`/books?search=${search}`);
          }
        }}
      >
        <Input
          name="search"
          type="text"
          placeholder="Search for any book"
          className="p-4 text-base placeholder:text-base"
        />
        <SubmitButton text="search" />
      </form>
    </div>
  );
}
