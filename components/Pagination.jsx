import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="max-w-7xl mx-auto flex justify-center items-center py-12 px-4 border-t border-zinc-100">
      <div className="flex items-center gap-6">
        {page > 1 ? (
          <Link
            href={`/properties?page=${page - 1}`}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg text-zinc-900 font-bold hover:bg-zinc-50 transition active:scale-95"
          >
            <ChevronLeft size={18} />
            <span>Prev</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-lg text-zinc-300 cursor-not-allowed">
            <ChevronLeft size={18} />
            <span>Prev</span>
          </div>
        )}

        <span className="text-zinc-900 font-medium text-sm">
          Page <strong className="font-bold">{page}</strong> of{" "}
          <strong className="font-bold">{totalPages}</strong>
        </span>

        {page < totalPages ? (
          <Link
            href={`/properties?page=${page + 1}`}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg text-zinc-900 font-bold hover:bg-zinc-50 transition active:scale-95"
          >
            <span>Next</span>
            <ChevronRight size={18} />
          </Link>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-lg text-zinc-300 cursor-not-allowed">
            <span>Next</span>
            <ChevronRight size={18} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Pagination;
