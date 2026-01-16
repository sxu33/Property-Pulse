"use client";
import { useState, createContext, useContext, useEffect } from "react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count !== undefined) setUnreadCount(res.count);
      });
    }
  }, [session, getUnreadMessageCount]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
