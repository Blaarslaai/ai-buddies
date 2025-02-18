import Image from "next/image";
import getAuth from "./auth";
import Navbar from "./components/navbar";
import SignInButton from "./components/signInButton";

import friendImage from "./assets/2.png";
import Footer from "./components/footer";

export default async function HomePage() {
  const auth = getAuth();
  const user = await auth.user();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      {!user ? (
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
                <p className="py-6">
                  Imagine a friend who’s always there for you—ready to chat,
                  listen, and grow with you. With <strong>AI Buddies</strong>,
                  you can create your perfect AI companion, tailored to your
                  personality and interests.
                  <br />
                  Whether you need a fun conversation, deep discussions, or just
                  someone to brighten your day, your AI Buddy is here for you!
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
                <div className="py-10 flex justify-end items-end">
                  <SignInButton
                    content="Sign-up / Login"
                    style="btn btn-neutral text-blue-100"
                  />
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
