import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link href="/">
            <span className="hover:text-gray-300 cursor-pointer">
              Jaycee Walk
            </span>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/">
            <span className="hover:text-gray-300 cursor-pointer">Accueil</span>
          </Link>
          <Link href="/about">
            <span className="hover:text-gray-300 cursor-pointer">A propos</span>
          </Link>
          <Link href="/home">
            <span className="hover:text-gray-300 cursor-pointer">La carte</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-gray-300 cursor-pointer">Contact</span>
          </Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton  />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
