"use client";

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ProfileForm from "../components/profileForm";

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-white text-slate-800">
        <h1 className="text-5xl font-bold ml-5">Welcome to your profile!</h1>

        <div className="flex justify-center items-center">
          <ProfileForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
