export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center">
        <div className="font-semibold tracking-widest text-sm text-black">
          TAN BUI
        </div>

        <nav className="flex gap-8 text-sm ml-auto text-black">
          <a href="#">Work</a>
          <a href="#">Expertise</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}