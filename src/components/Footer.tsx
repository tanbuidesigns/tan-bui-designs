import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-widest text-sm">
            TAN BUI DESIGNS
          </p>
          <p className="text-gray-500 mt-2">
            Multidisciplinary Design Consultant
          </p>
        </div>

        <nav className="flex gap-6 text-sm">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}