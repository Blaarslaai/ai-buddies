/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import friendImage from "./assets/2.png";
import Footer from "./components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "./context/AppContext";
import { supabase } from "./utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createCustomer } from "./utils/paystack";
import { getUserData } from "./utils/serverFunction";

export default function HomePage() {
  const [, setSession] = useState<Session | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { state, setState } = useAppContext();

  useEffect(() => {
    async function getLoggedInUserData() {
      const userDetails = await supabase.auth.getUser();
      setState((prev: any) => ({ ...prev, user: userDetails }));

      if (userDetails.data.user?.email) {
        const userData = await getUserData(userDetails.data.user.email);

        if (userData) {
          setState((prev: any) => ({ ...prev, supabaseUser: userData }));
        } else {
          // Create User
          setShowRegister(true);
        }
      }
    }

    setIsMounted(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    if (typeof window !== "undefined") {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);

        console.log(event);

        if (event === "SIGNED_IN" && session) {
          getLoggedInUserData();
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [setState]);

  if (!isMounted) {
    return null;
  }

  async function signUp(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string
  ) {
    (document.getElementById("signUp_modal") as HTMLDialogElement).close();

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) {
      createCustomer(firstname, lastname, email, phone);
    }
  }

  async function loginEmail(email: string, password: string) {
    (document.getElementById("login_modal") as HTMLDialogElement).close();

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
      return;
    }
  }

  async function loginGoogle() {
    (document.getElementById("login_modal") as HTMLDialogElement).close();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.log(error);
      return;
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {!state.user ? (
        <main className="flex-grow bg-white text-slate-800 overflow-auto">
          <div className="h-[80vh] overflow-auto">
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row">
                <Image
                  src={friendImage}
                  alt=""
                  className="max-w-sm rounded-lg shadow-2xl"
                  width={1000}
                  height={5000}
                />

                <div>
                  <h1 className="text-5xl font-bold">
                    🌟 AI Buddies{" "}
                    <sub className="text-sm">
                      {" "}
                      - Your Personalized AI Friend Awaits!
                    </sub>
                  </h1>
                  <h2>Create, Customize, and Connect</h2>
                  <p className="py-6">
                    Imagine a friend who’s always there for you—ready to chat,
                    listen, and grow with you. With <strong>AI Buddies</strong>,
                    you can create your perfect AI companion, tailored to your
                    personality and interests.
                    <br />
                    Whether you need a fun conversation, deep discussions, or
                    just someone to brighten your day, your AI Buddy is here for
                    you!
                  </p>
                  <ul>
                    <li className="py-1">
                      🎨 Customize Their Personality & Style
                    </li>
                    <li className="py-1">
                      💬 Engage in Meaningful Conversations
                    </li>
                    <li className="py-1">🤖 Always Learning, Always There</li>
                    <li className="py-1">
                      🚀 Start Creating Your AI Buddy Today!
                    </li>
                  </ul>
                  <div className="flex flex-row">
                    <div className="flex-1">
                      <div className="flex justify-center items-center mt-14">
                        <div className="flex flex-col">
                          <div className="flex-1">
                            <p className="text-xl font-bold">
                              Scroll Down for More
                            </p>
                          </div>
                          <div className="flex-1 mt-5">
                            <div className="flex justify-center items-center text-red-200">
                              <FontAwesomeIcon
                                icon={faArrowAltCircleDown}
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-10 flex-1">
                      <div className="flex justify-end items-end">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            (
                              document.getElementById(
                                "signUp_modal"
                              ) as HTMLDialogElement
                            ).showModal()
                          }
                        >
                          Sign Up
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            (
                              document.getElementById(
                                "login_modal"
                              ) as HTMLDialogElement
                            ).showModal()
                          }
                        >
                          Login
                        </button>
                        <button className="btn btn-error" onClick={signOut}>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex-1 flex justify-center">
                <h1 className="text-5xl font-bold">Description</h1>
              </div>
              <div className="flex flex-row justify-center items-center text-center mt-5">
                <p>
                  AI Buddies is a SaaS (Software as a Service) product for the
                  end-user to enjoy.
                  <br />
                  The service offers AI model communication and customization by
                  the end-user. Basically, you make your own custom AI model
                  based on a personality you supply it.
                  <br />
                  This model can be used for social communication, being a
                  reasearch partner, assisting with work, coding, and so much
                  more.
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-16">
              <div className="flex-1 flex justify-center">
                <h1 className="text-5xl font-bold">Pricing Plans</h1>
              </div>
              <div className="flex flex-row justify-center items-center mt-5">
                <div className="flex justify-center w-full">
                  <div className="flex flex-col flex-1 bg-slate-200 mx-10 rounded-lg p-5 h-full">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-center w-full mb-5">
                        Plan 1<br />
                        Soloist
                      </h2>
                    </div>
                    <div className="flex-1">
                      <p>
                        This plan is ideal for someone who wants to interact
                        with an AI model on a strict online bases, with
                        communication being initiated from the end-user.
                      </p>
                      <ul className="list-disc pl-10 mt-5">
                        <li>Support for one AI model</li>
                        <li>Zero WhatsApp functionality</li>
                      </ul>
                      <p className="mt-5">
                        Price: <strong>$ 5.00</strong> per month
                      </p>
                      <p className="mt-1">
                        Price: <strong>$ 50.00</strong> per year
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 bg-slate-200 mx-10 rounded-lg p-5 h-full">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-center w-full mb-5">
                        Plan 2<br />
                        Groupie
                      </h2>
                    </div>
                    <div className="flex-1">
                      <p>
                        This plan is ideal for someone who wants to interact
                        with multiple AI models on an online and WhatsApp bases,
                        with communication being initiated from the end-user.
                      </p>
                      <ul className="list-disc pl-10 mt-5">
                        <li>Support for up to two AI models</li>
                        <li>Limited WhatsApp functionality</li>
                      </ul>
                      <p className="mt-5">
                        Price: <strong>$ 15.00</strong> per month
                      </p>
                      <p className="mt-1">
                        Price: <strong>$ 160.00</strong> per year
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 bg-slate-200 mx-10 rounded-lg p-5 h-full">
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-center w-full mb-5">
                        Plan 3<br />
                        Socialite
                      </h2>
                    </div>
                    <div className="flex-1">
                      <p>
                        This plan is ideal for someone who wants to interact
                        with multiple AI models on an online and WhatsApp bases,
                        with communication being initiated from the end-user and
                        the AI model.
                      </p>
                      <ul className="list-disc pl-10 mt-5">
                        <li>Support for up to 3 AI models</li>
                        <li>Full WhatsApp functionality</li>
                      </ul>
                      <p className="mt-5">
                        Price: <strong>$ 40.00</strong> per month
                      </p>
                      <p className="mt-1">
                        Price: <strong>$ 450.00</strong> per year
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-grow bg-white text-slate-800">
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
              <Image
                src={friendImage}
                alt=""
                className="max-w-sm rounded-lg shadow-2xl"
                width={1000}
                height={5000}
              />

              <div>
                <h1 className="text-5xl font-bold">
                  🌟 AI Buddies{" "}
                  <sub className="text-sm">
                    {" "}
                    - Your Personalized AI Friend Awaits!
                  </sub>
                </h1>
                <h2>Create, Customize, and Connect</h2>
                <p className="py-6">Welcome</p>
                <ul>
                  <li className="py-1">
                    🎨 Customize Their Personality & Style
                  </li>
                  <li className="py-1">
                    💬 Engage in Meaningful Conversations
                  </li>
                  <li className="py-1">🤖 Always Learning, Always There</li>
                  <li className="py-1">
                    🚀 Start Creating Your AI Buddy Today!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer />
      <dialog id="signUp_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Sign Up Form</h3>
          <p className="py-4">Enter your details below to sign up.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const form = e.currentTarget;
              const formData = new FormData(form);

              const email = formData.get("email") as string;
              const password = formData.get("password") as string;
              const firstname = formData.get("firstname") as string;
              const lastname = formData.get("lastname") as string;
              const phone = formData.get("phone") as string;

              const submitButton = (e.nativeEvent as SubmitEvent)
                .submitter as HTMLButtonElement;

              if (submitButton.name === "signUpEmail") {
                signUp(email, password, firstname, lastname, phone);
              }

              // Reset the form after submission
              form.reset();
            }}
          >
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text text-slate-200">Email</span>
              </div>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full max-w-lg"
                required
              />
            </label>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text text-slate-200">Password</span>
              </div>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full max-w-lg"
                required
              />
            </label>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text text-slate-200">First Name</span>
              </div>
              <input
                name="firstname"
                type="text"
                className="input input-bordered w-full max-w-lg"
                required
              />
            </label>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text text-slate-200">Last Name</span>
              </div>
              <input
                name="lastname"
                type="text"
                className="input input-bordered w-full max-w-lg"
                required
              />
            </label>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text text-slate-200">Phone Number</span>
              </div>
              <input
                name="phone"
                type="text"
                className="input input-bordered w-full max-w-lg"
                required
              />
            </label>
            <button
              className="btn btn-primary float-right mt-5"
              type="submit"
              name="signUpEmail"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
              Sign Up with Email
            </button>
          </form>
          <button className="btn btn-accent mt-5" onClick={loginGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
            Sign Up with Google
          </button>
        </div>
      </dialog>
      <dialog id="login_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Login Form</h3>
          <p className="py-4">Enter your details below to login.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;

              loginEmail(email, password);
            }}
          >
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text text-slate-200">Email</span>
              </div>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full max-w-lg"
                required
              />
            </label>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text text-slate-200">Password</span>
              </div>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full max-w-lg"
                required
              />
            </label>
            <button className="btn btn-primary float-right mt-5" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-envelope-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
              Login with Email
            </button>
          </form>
          <button className="btn btn-accent mt-5" onClick={loginGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
            Login with Google
          </button>
        </div>
      </dialog>

      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-96 relative">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Sign Up Form</h3>
            <p className="py-4">Enter your details below to sign up.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const formData = new FormData(form);

                const firstname = formData.get("firstname") as string;
                const lastname = formData.get("lastname") as string;
                const phone = formData.get("phone") as string;

                createCustomer(
                  firstname,
                  lastname,
                  state.user.data.user.email,
                  phone
                );

                // Reset the form after submission
                form.reset();

                setShowRegister(false);
              }}
            >
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text text-slate-200">First Name</span>
                </div>
                <input
                  name="firstname"
                  type="text"
                  className="input input-bordered w-full max-w-lg"
                  required
                />
              </label>
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text text-slate-200">Last Name</span>
                </div>
                <input
                  name="lastname"
                  type="text"
                  className="input input-bordered w-full max-w-lg"
                  required
                />
              </label>
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text text-slate-200">
                    Phone Number
                  </span>
                </div>
                <input
                  name="phone"
                  type="text"
                  className="input input-bordered w-full max-w-lg"
                  required
                />
              </label>
              <button
                className="btn btn-primary float-right mt-5"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-floppy-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                  <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                </svg>
                Save Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
