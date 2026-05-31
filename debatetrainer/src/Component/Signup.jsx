import { useState } from "react";
import { supabase } from "../lib/supabase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });
    console.log(data)
    console.log(error)

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user)

    console.log("AUTH UID:", user.id);
    const response = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: "xtrrrr",
      })
      .select();

    console.log(response);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION USER:", session?.user?.id);
  };

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleSignup}>
        Signup
      </button>
    </>
  );
}

export default Signup;