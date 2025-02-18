import getAuth from "../auth";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default async function Subscription() {
  const auth = getAuth();
  const user = await auth.user();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-grow bg-white text-slate-800">
        <h1>HELLO SUBS!</h1>

        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </main>

      <Footer />
    </div>
  );
}
