"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.svg";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import UserNav from "./UserNav";

interface INavProps {
  name: string;
  href: string;
}

const navItems: INavProps[] = [
  { name: "Home", href: "/home" },
  { name: "TV Shows", href: "/home/shows" },
  { name: "Movies", href: "/home/movies" },
  { name: "Recently Added", href: "/home/recently" },
  { name: "My List", href: "/home/user/list" },
];

export default async function Navbar() {
  const pathName = usePathname();
  return (
    <header className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <nav className="flex items-center">
        <Link href="/home">
          <Image src={Logo} alt="Nextflix Logo" className="w-32" priority />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {navItems.map((navItem) => (
            <li key={navItem.name}>
              <Link
                href={navItem.href}
                className={`${
                  pathName === navItem.href ? "text-white" : "text-gray-400"
                } hover:underline hover:text-white`}
              >
                {navItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
        <Bell className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
        <UserNav />
      </div>
    </header>
  );
}
