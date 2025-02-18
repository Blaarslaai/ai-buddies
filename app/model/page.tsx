import getAuth from "../auth";
import ChatSpace from "../components/chat";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
// import Plans from "./components/plans";

export default async function Model() {
  const auth = getAuth();
  const user = await auth.user();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-grow bg-white text-slate-800">
        <h1 className="text-5xl font-bold ml-5">AI Chat</h1>

        <ChatSpace user={user} />
      </main>

      <Footer />
    </div>
  );
}
