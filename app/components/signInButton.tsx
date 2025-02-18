"use client";

import { signIn } from "@reflowhq/auth-next/client";
import { useRouter } from "next/navigation";

type props = {
  content: string;
  style: string;
};

export default function SignInButton({ content, style }: props) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        signIn({
          onSignin: () => router.replace("/"),
        })
      }
      className={`${style}`}
    >
      {content}
    </button>
  );
}
