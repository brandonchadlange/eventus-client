import { useSession } from "next-auth/react";
import ApplicationDashboard from "../components/dashboard";
import HomePage from "../components/home";

const Home = () => {
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" && <HomePage />}
      {status === "authenticated" && <ApplicationDashboard />}
    </>
  );
};

export default Home;
