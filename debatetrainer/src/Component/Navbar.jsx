import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          AI Debate Arena
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <a
            href="#how-it-works"
            className="text-slate-400 hover:text-white transition"
          >
            How It Works
          </a>

          <a
            href="#opponents"
            className="text-slate-400 hover:text-white transition"
          >
            Opponents
          </a>

          <a
            href="#reports"
            className="text-slate-400 hover:text-white transition"
          >
            Reports
          </a>

        </div>

        {/* CTA */}
        <Link
          to="/create-debate"
          className="
            bg-white
            text-black
            px-5
            py-2.5
            rounded-xl
            font-medium
            transition-all
            duration-300
            hover:scale-105
            hover:bg-slate-200
            active:scale-95
          "
        >
          Start Debate
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;