"use client";

import SignOutButton from "./signOutButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMessage } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { state } = useAppContext();

  return (
    <div className="navbar bg-black py-4">
      <div className="flex-1">
        <Link className="text-xl text-slate-300" href="/">
          AI Buddies
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {state.user && (
            <Link href="model">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle mr-5 w-10"
              >
                <FontAwesomeIcon icon={faMessage} size="2x" fixedWidth />
              </div>
            </Link>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <FontAwesomeIcon icon={faUser} size="2x" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {state.user && (
              <>
                <li>
                  <Link className="justify-between" href="profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="subscription">Subscription</Link>
                </li>
              </>
            )}
            <li>{state.user ? <SignOutButton style="" /> : <p>LOGINS</p>}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
