import { bookService } from "@/app/services/book.service";
import { UserBooksType } from "@/app/types";
import UserBookCard from "../UserBookCard";

export default async function UserBooksComponent({
  userId,
  category,
}: {
  userId: string;
  category: string;
}) {
  let reviews: UserBooksType[];

  if (category === "reading") {
    reviews = await bookService.getBooksWithReadingStatus(userId);
  } else if (category === "haveRead") {
    reviews = await bookService.getBooksWithHaveReadStatus(userId);
  } else {
    reviews = await bookService.getFavouriteBooks(userId);
  }

  if (reviews.length === 0)
    return (
      <div className="h-[50vh] flex items-center justify-center text-center">
        You have no books you are currently reading.
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full">
        {reviews.map((review: UserBooksType, index) => (
          <div key={index} className="max-w-[350px] mx-auto w-full">
            <UserBookCard review={review} />
          </div>
        ))}
      </div>
    </>
  );
}
