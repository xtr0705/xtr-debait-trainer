import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try{
        const { data} = await supabase.auth.getUser();

        if (data.user) {
          setAuthenticated(true);
        }
        
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
    }
    authCheck();
  }, [])

  if (loading) {
    return <div className="
min-h-screen
bg-[#09090B]
text-white
flex
items-center
justify-center
">
        <div className="text-center">

          <div className="
      w-12
      h-12
      border-4
      border-violet-500
      border-t-transparent
      rounded-full
      animate-spin
      mx-auto
      mb-4
    "/>

          <p className="text-zinc-400">
            Loading ...
          </p>

        </div>
      </div>
  }

  if (authenticated) {
    return children;
  }

  return <Navigate to='/login' />
}

export default ProtectedRoute;