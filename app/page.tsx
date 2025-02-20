import Image from "next/image";
import getAuth from "./auth";
import Navbar from "./components/navbar";
import SignInButton from "./components/signInButton";

import friendImage from "./assets/2.png";
import Footer from "./components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

export default async function HomePage() {
  const auth = getAuth();
  const user = await auth.user();
  const subscription = await auth.subscription();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} subscription={subscription} />

      {!user ? (
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
                        <SignInButton
                          content="Sign-up / Login"
                          style="btn btn-neutral text-blue-100"
                        />
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
              <div className="flex flex-row justify-center items-center mt-5">
                <p>
                  AI Buddies is a SaaS (Software as a Service) product for the
                  end-user to enjoy.
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
                        Price: <strong>$ 5.00</strong>
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
                        Price: <strong>$ 15.00</strong>
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
                        Price: <strong>$ 40.00</strong>
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
                <p className="py-6">Welcome {user.name}</p>
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
    </div>
  );
}
