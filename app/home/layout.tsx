import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";

import Navbar from "../components/Navbar";

interface IProps {
  children: ReactNode;
}
const HomeLayout: FC<IProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  } else {
    return (
      <>
        <Navbar />
        <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </main>
      </>
    );
  }
};
export default HomeLayout;
