"use client";
import { SessionProvier } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvier>{children}</SessionProvier>;
};

export default AuthProvider;
