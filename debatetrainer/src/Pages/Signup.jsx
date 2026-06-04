import { useState } from "react";
import { useForm } from "react-hook-form";
import  supabase  from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signup = async ({
    email,
    password,
    username,
  }) => {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (!user) {
      setError("Failed to create user");
      setLoading(false);
      return;
    }

    const { error: profileError } =
      await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username,
        });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">
        Sign up
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit(signup)}
        className="space-y-4"
      >
        <div>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 w-full"
            {...register("username", {
              required: "Username is required",
            })}
          />

          {errors.username && (
            <p className="text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading
            ? "Creating Account..."
            : "Sign up"}
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;