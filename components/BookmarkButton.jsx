"use client";

import { useState, useTransition, useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import toggleBookmark from "@/app/actions/toggleBookmark";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property, initialBookmarkStatus }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkStatus);
  const { data: session } = useSession();

  const [isLoading, startTransition] = useTransition();
  const [optimisticIsBookmarked, setOptimisticIsBookmarked] = useOptimistic(
    isBookmarked,
    (state, newValue) => newValue
  );

  const handleClick = async () => {
    if (!session) {
      toast.error("You must sign in to bookmark a listing");
      return;
    }

    startTransition(async () => {
      setOptimisticIsBookmarked(!optimisticIsBookmarked);
      const propertyId = property._id;
      const res = await toggleBookmark(propertyId);
      if (res.error) {
        return toast.error(res.error);
      }
      if (res.message) {
        toast.success(res.message);
        setIsBookmarked(res.isBookmarked);
      }
    });
  };

  return (
    <Button
      className={`w-full h-12 rounded-xl gap-2 font-bold text-base transition-all active:scale-[0.98] border-2 shadow-none ${
        optimisticIsBookmarked
          ? "bg-zinc-900 border-zinc-900 text-white hover:bg-black hover:border-black"
          : "bg-white border-zinc-900 text-zinc-900 hover:bg-zinc-50"
      }`}
      onClick={() => handleClick()}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <Bookmark
          size={20}
          className={`${optimisticIsBookmarked ? "fill-white" : "fill-none"}`}
          strokeWidth={2.5}
        />
      )}

      {optimisticIsBookmarked ? "Saved" : "Save Listing"}
    </Button>
  );
};

export default BookmarkButton;
