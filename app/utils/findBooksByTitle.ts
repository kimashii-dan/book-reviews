/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookType } from "../types";

export async function findBooksByTitle(
  title: string | undefined
): Promise<BookType[] | null> {
  if (title === undefined) return null;

  try {
    const data = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );
    if (!data.ok) throw new Error("Failed to fetch data");

    const matches = await data.json();
    if (!matches.docs.length) return null;

    return matches.docs.map((match: any) => {
      return {
        id: match.key.split("/").pop(),
        title: match.title,
        author: match.author_name?.[0] || "Unknown",
        publishDate: match.first_publish_year || "Unknown",
        cover: match.cover_i
          ? `https://covers.openlibrary.org/b/id/${match.cover_i}-L.jpg`
          : "",
      };
    });
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}

// function fix_desc(info: string | { description?: string | { value: string } }) {
//   if (typeof info === "object" && info !== null && "description" in info) {
//     const description = info.description;
//     if (typeof description === "string") {
//       return description.split("\r\n")[0];
//     } else if (typeof description === "object" && "value" in description) {
//       return description.value.split("\r\n")[0];
//     }
//   }
//   return "No description available";
// }
