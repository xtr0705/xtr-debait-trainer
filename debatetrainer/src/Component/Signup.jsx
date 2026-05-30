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

    console.log("DATA:", data);
    console.log("ERROR:", error);
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