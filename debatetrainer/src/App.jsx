import { useEffect } from 'react';
import './App.css'
import Login from './Component/Login';
import Signup from './Component/Signup';
import { supabase } from './lib/supabase';
import CreateDebate from './Component/CreateDebate';
import GetDebate from './Component/GetDebate';
import InsertMessage from './Component/InsertMessage';
import GetMessage from './Component/GetMessage';

function App() {

useEffect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (event, session) => {
      console.log(event);
      console.log(session);
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, []);

  const logout = async()=>{
    await supabase.auth.signOut();
  };

  return (
    <>
      <Signup />
      <Login />
      <button onClick={logout} >logout user</button>
      <CreateDebate />
      <GetDebate />
      <InsertMessage />
      <GetMessage />
    </>
  )
}

export default App
