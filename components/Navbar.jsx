"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import profileDefault from "@/assets/images/profile.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { Menu, Bell, X } from "lucide-react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessageCount from "./UnreadMessageCount";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [providers, setProviders] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isProfileMenuOpen) return;
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 z-[100] sticky top-0 h-20 flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <Link className="flex items-center gap-2" href="/">
              <Image className="h-8 w-auto" src={logo} alt="PropertyPulse" />
              <span className="hidden md:block text-[#FF385C] text-xl font-bold tracking-tighter">
                propertypulse
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition hover:bg-gray-100 ${
                pathname === "/" ? "text-zinc-950" : "text-zinc-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`px-4 py-2 rounded-full text-sm font-medium transition hover:bg-gray-100 ${
                pathname === "/properties" ? "text-zinc-950" : "text-zinc-500"
              }`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                className={`px-4 py-2 rounded-full text-sm font-medium transition hover:bg-gray-100 ${
                  pathname === "/properties/add"
                    ? "text-zinc-950"
                    : "text-zinc-500"
                }`}
              >
                Add Property
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!session && (
              <div className="hidden md:block">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <Button
                      key={index}
                      onClick={() => signIn(provider.id)}
                      variant="outline"
                      className="rounded-full border-zinc-300 text-zinc-950 font-bold hover:shadow-md transition flex items-center gap-2 h-10 px-5"
                    >
                      <FaGoogle className="text-zinc-600" />
                      <span>Login</span>
                    </Button>
                  ))}
              </div>
            )}

            {session && (
              <div className="flex items-center gap-1 sm:gap-3">
                <Link
                  href="/messages"
                  className="relative p-2 text-zinc-600 hover:bg-gray-100 rounded-full transition"
                >
                  <Bell size={20} />
                  <UnreadMessageCount />
                </Link>

                <div className="relative hidden md:flex" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 border border-zinc-200 rounded-full p-1.5 pl-3 hover:shadow-md transition bg-white"
                  >
                    <Menu size={16} className="text-zinc-600" />
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={profileImage || profileDefault}
                      width={32}
                      height={32}
                      alt=""
                    />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 z-[110] top-[calc(100%+8px)] w-64 origin-top-right rounded-xl bg-white py-2 shadow-[0_8px_28px_rgba(0,0,0,0.12)] border border-gray-100">
                      <Link
                        href="/profile"
                        className={`block px-4 py-3 text-sm font-medium hover:bg-gray-50 ${
                          pathname === "/profile"
                            ? "text-[#FF385C]"
                            : "text-zinc-900"
                        }`}
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/properties/saved"
                        className={`block px-4 py-3 text-sm font-medium hover:bg-gray-50 ${
                          pathname === "/properties/saved"
                            ? "text-[#FF385C]"
                            : "text-zinc-900"
                        }`}
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Saved Properties
                      </Link>
                      <div className="h-[1px] bg-gray-100 my-1"></div>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-gray-50"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          signOut();
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              className="md:hidden p-2 text-zinc-950 hover:bg-gray-100 rounded-full transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 md:hidden shadow-2xl z-[90] animate-in slide-in-from-top-2 duration-200 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="space-y-1 px-4 pb-8 pt-4">
            <Link
              href="/"
              className={`block rounded-lg px-4 py-3 text-base font-bold ${
                pathname === "/"
                  ? "bg-gray-50 text-[#FF385C]"
                  : "text-zinc-950 hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`block rounded-lg px-4 py-3 text-base font-bold ${
                pathname === "/properties"
                  ? "bg-gray-50 text-[#FF385C]"
                  : "text-zinc-950 hover:bg-gray-50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>

            {session ? (
              <>
                <Link
                  href="/properties/add"
                  className={`block rounded-lg px-4 py-3 text-base font-bold ${
                    pathname === "/properties/add"
                      ? "bg-gray-50 text-[#FF385C]"
                      : "text-zinc-950 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Add Property
                </Link>
                <div className="h-[1px] bg-gray-100 my-4 mx-2"></div>
                <Link
                  href="/profile"
                  className={`block rounded-lg px-4 py-3 text-base font-bold ${
                    pathname === "/profile"
                      ? "bg-gray-50 text-[#FF385C]"
                      : "text-zinc-950 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  href="/properties/saved"
                  className={`block rounded-lg px-4 py-3 text-base font-bold ${
                    pathname === "/properties/saved"
                      ? "bg-gray-50 text-[#FF385C]"
                      : "text-zinc-950 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Saved Properties
                </Link>
                <button
                  className="block w-full text-left rounded-lg px-4 py-3 text-base font-bold text-zinc-950 hover:bg-gray-50 mt-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-4 border-t border-gray-100 mt-4">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <Button
                      key={index}
                      onClick={() => signIn(provider.id)}
                      className="w-full bg-zinc-950 text-white rounded-xl h-14 font-bold text-lg"
                    >
                      Login or Register
                    </Button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
