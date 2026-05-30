import { useState } from "react";
import { supabase } from "../lib/supabase";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword]=useState("");

  const handleLogin = async ()=>{
    const {data,error}=
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    console.log(data);
    console.log(error);
  };

  return (
    <div>
      <input 
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input 
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin} >Login</button>  
    </div>
  );
}

export default Login;