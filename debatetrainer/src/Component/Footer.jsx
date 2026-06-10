import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-24">

  <div className="max-w-6xl mx-auto px-6 py-16">

    <div className="grid md:grid-cols-3 gap-12">

      <div>

        <h3 className="text-xl font-serif font-semibold mb-4">
          Debate Arena
        </h3>

        <p className="text-zinc-400 leading-relaxed">
          Challenge your ideas, strengthen your reasoning,
          and discover weaknesses in your arguments before
          someone else does.
        </p>

      </div>

      <div>

        <h4 className="font-semibold mb-4 text-white">
          Navigation
        </h4>

        <div className="flex flex-col gap-3">

          <a
            href="#how-it-works"
            className="
              text-zinc-400
              transition-colors
              duration-300
              hover:text-violet-300
            "
          >
            How It Works
          </a>

          <a
            href="#opponents"
            className="
              text-zinc-400
              transition-colors
              duration-300
              hover:text-violet-300
            "
          >
            Opponents
          </a>

          <Link
            to="/history"
            className="
              text-zinc-400
              transition-colors
              duration-300
              hover:text-violet-300
            "
          >
            Debate Results
          </Link>

        </div>

      </div>

      <div>

        <h4 className="font-semibold mb-4 text-white">
          Start Debating
        </h4>

        <p className="text-zinc-400 mb-5">
          Put your reasoning to the test against
          multiple AI personalities.
        </p>

        <Link
          to="/create-debate"
          className="
            inline-flex
            items-center

            bg-violet-500
            text-white

            px-5
            py-3
            font-medium

            transition-all
            duration-300

            hover:bg-violet-400
            hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
          "
        >
          Start Debate
        </Link>

      </div>

    </div>

    <div className="border-t border-zinc-800 mt-12 pt-8">

      <p className="text-center text-zinc-500 text-sm">
        © 2026 DebateArena. All rights reserved.
      </p>

    </div>

  </div>

</footer>
  );
}

export default Footer;