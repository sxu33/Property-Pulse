import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600">
          <p>&copy; {currentYear} PropertyPulse, Inc.</p>
          <span className="hidden md:inline">·</span>
          <Link href="/" className="hover:underline">
            Privacy
          </Link>
          <span className="hidden md:inline">·</span>
          <Link href="/" className="hover:underline">
            Terms
          </Link>
          <span className="hidden md:inline">·</span>
          <Link href="/properties" className="hover:underline">
            Sitemap
          </Link>
        </div>

        <div className="flex items-center gap-6 font-semibold text-sm text-gray-900">
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <Globe className="h-4 w-4" />
            <span>English (US)</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
