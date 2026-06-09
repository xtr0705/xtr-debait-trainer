import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090B]/70 border-b border-zinc-800">

  <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

    <Link
      to="/"
      className="
        text-xl
        font-bold
        tracking-tight
        font-serif
      "
    >
      AI Debate Arena
    </Link>

    <div className="hidden md:flex items-center gap-8">

      <a
        href="#how-it-works"
        className="
          text-zinc-400
          transition-all
          duration-300
          hover:text-violet-300
          hover:-translate-y-0.5
        "
      >
        How It Works
      </a>

      <a
        href="#opponents"
        className="
          text-zinc-400
          transition-all
          duration-300
          hover:text-violet-300
          hover:-translate-y-0.5
        "
      >
        Opponents
      </a>

      <a
        href="/History/:user_id"
        className="
          text-zinc-400
          transition-all
          duration-300
          hover:text-violet-300
          hover:-translate-y-0.5
        "
      >
        Debate Results
      </a>

    </div>

    <Link
      to="/create-debate"
      className="
        group
        relative
        overflow-hidden

        bg-violet-500
        text-white

        px-5
        py-2.5

        
        font-medium

        transition-all
        duration-300

        hover:bg-violet-400
        hover:-translate-y-0.5
        hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
      "
    >

      <span
        className="
          absolute
          top-0
          left-[-150%]
          h-full
          w-[50%]

          bg-linear-to-r
          from-transparent
          via-white/20
          to-transparent

          skew-x-12

          group-hover:left-[150%]

          transition-all
          duration-700
        "
      />

      <span className="relative">
        Start Debate
      </span>

    </Link>

  </div>

</nav>
  );
}

export default Navbar;