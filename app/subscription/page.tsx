import getAuth from "../auth";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Plans from "../components/plans";

export default async function Subscription() {
  const auth = getAuth();
  const user = await auth.user();
  const subscription = await auth.subscription();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} subscription={subscription} />

      <main className="flex-grow bg-white text-slate-800">
        <h1 className="text-5xl font-bold ml-5">Subscriptions</h1>

        <Plans subscription={subscription} />
      </main>

      <Footer />
    </div>
  );
}
