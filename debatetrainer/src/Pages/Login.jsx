import { useState } from "react";
import { useForm } from "react-hook-form";
import supabase from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async ({ email, password }) => {
    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/");
  };

  return (
    <div
      className="
    min-h-screen
    bg-[#09090B]
    text-white
    relative
    overflow-hidden
  "
    >

      <div
        className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_50%)]
      pointer-events-none
    "
      />

      <div className="relative flex items-center justify-center min-h-screen px-6">

        <div className="w-full max-w-md">
          <div className="text-center mb-10">

            <p className="text-zinc-500 uppercase tracking-widest mb-4">
              DebateArena
            </p>

            <h1 className="text-5xl font-serif mb-4">
              Welcome Back
            </h1>

            <p className="text-zinc-400">
              Continue your journey of challenging ideas.
            </p>

          </div>

          {error && (
            <p className="bg-red-500/10
border
border-red-500/20
text-red-400
p-4
mb-6 mb-4">
              {error}
            </p>
          )}

          <div
            className="
    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    p-8

    shadow-[0_0_40px_rgba(255,255,255,0.03)]
  "
          >

            <form
              onSubmit={handleSubmit(login)}
              className="space-y-4"
            >
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="
  w-full

  bg-black/50

  border
  border-zinc-800

  px-4
  py-4

  text-white

  placeholder:text-zinc-500

  focus:outline-none
  focus:border-violet-500

  transition-all
"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="bg-red-500/10
border
border-red-500/20
text-red-400
p-4
mb-6">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="
  w-full

  bg-black/50

  border
  border-zinc-800

  px-4
  py-4

  text-white

  placeholder:text-zinc-500

  focus:outline-none
  focus:border-violet-500

  transition-all
"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <p className="bg-red-500/10
border
border-red-500/20
text-red-400
p-4
mb-6">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
    group
    relative
    overflow-hidden

    w-full

    bg-violet-500
    text-white

    py-4

    font-semibold

    transition-all
    duration-300

    hover:bg-violet-400
    hover:-translate-y-0.5
    hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]

    disabled:opacity-50
  "
              >

                <span
                  className="
      absolute
      top-0
      left-[-150%]
      h-full
      w-[50%]

      bg-gradient-to-r
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
                  {loading ? "Logging In..." : "Login"}
                </span>

              </button>
            </form>
          </div>

          <p className="text-center text-zinc-400 mt-8">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="
      text-violet-400
      hover:text-violet-300
      transition
    "
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;