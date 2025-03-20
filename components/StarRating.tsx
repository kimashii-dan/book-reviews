import { Star } from "lucide-react";
import React from "react";
import { ReviewFormType } from "./ReviewForm";

type StarRatingType = {
  rating: number;
  handleChange: (name: keyof ReviewFormType, value: string | number) => void;
};

export default function StarRating({ rating, handleChange }: StarRatingType) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleChange("rating", star)}
          autoFocus={false}
          className="cursor-pointer"
        >
          <Star
            className={`w-10 h-10 ${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 fill-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
