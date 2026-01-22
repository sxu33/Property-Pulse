"use client";
import Link from "next/link";
import { SearchX } from "lucide-react";

const NotFoundPage = () => {
  return (
    <section className="bg-white min-h-[85vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-10">
        <div className="flex justify-center">
          <div className="p-10 bg-zinc-50 rounded-full border border-zinc-100">
            <SearchX className="text-zinc-950" size={80} strokeWidth={1.2} />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-zinc-950 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-zinc-500 font-light text-xl leading-relaxed">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-block bg-zinc-950 hover:bg-black text-white font-bold py-4 px-12 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-zinc-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
