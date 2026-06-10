import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "../lib/supabase";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#09090B]/70 border-b border-zinc-800">

      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          DebateArena
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

          <Link
            to="/history"
            className="
              text-zinc-400
              transition-all
              duration-300
              hover:text-violet-300
              hover:-translate-y-0.5
            "
          >
            Debate Results
          </Link>

        </div>

        {user ? (
          <div className="hidden md:flex items-center gap-3">

            <Link
              to="/create-debate"
              className="
                bg-violet-500
                text-white
                px-5
                py-2.5
                font-medium
                transition-all
                duration-300
                hover:bg-violet-400
                hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
              "
            >
              Start Debate
            </Link>

            <button
              onClick={logout}
              className="
                border
                border-zinc-800
                px-5
                py-2.5

                transition-all
                duration-300

                hover:border-red-500/40
                hover:bg-red-500/10
                hover:text-red-400
              "
            >
              Logout
            </button>

          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">

            <Link
              to="/login"
              className="
                border
                border-zinc-800
                px-5
                py-2.5

                transition-all
                duration-300

                hover:border-violet-500/40
              "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
                bg-violet-500
                text-white
                px-5
                py-2.5

                transition-all
                duration-300

                hover:bg-violet-400
              "
            >
              Sign Up
            </Link>

          </div>
        )}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            md:hidden
            text-2xl
            text-white
          "
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

      </div>

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden
              overflow-hidden

              border-t
              border-zinc-800

              bg-[#09090B]/95
              backdrop-blur-xl
            "
          >

            <div className="px-6 py-6 flex flex-col gap-5">

              <a
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="
                  text-zinc-300
                  hover:text-violet-300
                  transition
                "
              >
                How It Works
              </a>

              <a
                href="#opponents"
                onClick={() => setMobileOpen(false)}
                className="
                  text-zinc-300
                  hover:text-violet-300
                  transition
                "
              >
                Opponents
              </a>

              <Link
                to="/history"
                onClick={() => setMobileOpen(false)}
                className="
                  text-zinc-300
                  hover:text-violet-300
                  transition
                "
              >
                Debate Results
              </Link>

              {user ? (
                <>
                  <Link
                    to="/create-debate"
                    onClick={() => setMobileOpen(false)}
                    className="
                      bg-violet-500
                      text-center
                      text-white
                      py-3
                      font-medium
                      transition-all
                      duration-300
                      hover:bg-violet-400
                    "
                  >
                    Start Debate
                  </Link>

                  <button
                    onClick={logout}
                    className="
                      border
                      border-red-500/20

                      text-red-400

                      py-3

                      transition-all
                      duration-300

                      hover:bg-red-500/10
                    "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="
                      border
                      border-zinc-800

                      py-3
                      text-center

                      transition-all
                      duration-300

                      hover:border-violet-500/40
                    "
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="
                      bg-violet-500
                      text-center
                      text-white

                      py-3

                      font-medium

                      transition-all
                      duration-300

                      hover:bg-violet-400
                    "
                  >
                    Sign Up
                  </Link>
                </>
              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
}

export default Navbar;