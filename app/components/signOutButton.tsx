/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { supabase } from "../utils/supabase";

type props = {
  style: string;
};

export default function SignOutButton({ style }: props) {
  const { setState } = useAppContext();

  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut().then(() => {
      setState((prev: any) => ({ ...prev, user: null }));

      router.replace("/");
    });
  }

  return (
    <button onClick={logout} className={`${style}`}>
      Logout
    </button>
  );
}
