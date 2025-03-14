import { BookType } from "../types";

export async function findBookById(
  key: string | undefined
): Promise<BookType | null> {
  if (key === undefined) return null;

  try {
    const data = await fetch(`https://openlibrary.org/works/${key}.json`);
    if (!data.ok) throw new Error("Failed to fetch data");

    const bookDetails = await data.json();

    if (!bookDetails) return null;
    return {
      id: key,
      title: bookDetails.title,
      author: "",
      publishDate: bookDetails.first_publish_year || "Unknown date",
      cover:
        bookDetails.covers && bookDetails.covers.length > 0
          ? `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`
          : "",
      description: fix_desc(bookDetails),
    };
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}

function fix_desc(info: string | { description?: string | { value: string } }) {
  if (typeof info === "object" && info !== null && "description" in info) {
    const description = info.description;
    if (typeof description === "string") {
      return description.split("\r\n")[0];
    } else if (typeof description === "object" && "value" in description) {
      return description.value.split("\r\n")[0];
    }
  }
  return "No description available";
}
