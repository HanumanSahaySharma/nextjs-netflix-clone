import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GithubSignInButton from "../components/GithubSignInButton";
import GoogleSignInButton from "../components/GoogleSignInButton";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";

const Signup = async () => {
  const session = await getServerSession(authOptions);
  if(session) {
    return redirect('/home')
  }
  return (
    <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <form method="post" action="/api/auth/signin">
        <h1 className="text-3xl font-semibold text-white">Sign Up</h1>
        <div className="space-y-4 mt-5">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
          />
          <Button
            type="submit"
            variant={"destructive"}
            className="w-full bg-[#e50914]"
          >
            Sign Up
          </Button>
        </div>
      </form>
      <div className="mt-6 text-gray-500 text-sm">
        Already have an account?
        <Link href="/login" className="text-white hover:underline ml-1">
          Login here
        </Link>
      </div>
      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        <GithubSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
};
export default Signup;
