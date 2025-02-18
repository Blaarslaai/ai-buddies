"use client";

import { signOut } from "@reflowhq/auth-next/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        signOut({
          onSuccess: () => {
            router.replace("/");
          },
        })
      }
    >
      Logout
    </button>
  );
}
