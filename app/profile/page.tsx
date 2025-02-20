import getAuth from "../auth";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import ProfileForm from "../components/profileForm";

export default async function Profile() {
  const auth = getAuth();
  const user = await auth.user();
  const subscription = await auth.subscription();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} subscription={subscription} />

      <main className="flex-grow bg-white text-slate-800">
        <h1 className="text-5xl font-bold ml-5">Welcome to your profile!</h1>

        <div className="flex justify-center items-center">
          <ProfileForm user={user} isComponentLoading={!user ? true : false} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
