"use client";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

const ErrorPage = ({ error }) => {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-6 bg-zinc-50 rounded-full">
            <TriangleAlert
              className="text-zinc-900"
              size={64}
              strokeWidth={1.5}
            />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
            Something went wrong
          </h1>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block bg-zinc-900 hover:bg-black text-white font-bold py-4 px-10 rounded-xl transition-all active:scale-95 shadow-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
