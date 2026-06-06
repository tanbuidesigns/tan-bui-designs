import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center">
        <Link
          href="/"
          className="font-semibold tracking-widest text-sm text-black"
        >
          TAN BUI DESIGNS
        </Link>

        <nav className="flex gap-8 text-sm ml-auto text-black">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}