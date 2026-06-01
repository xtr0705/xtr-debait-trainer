import { supabase } from "../lib/supabase";

function CreateDebate() {
  const createDebate = async ()=>{
    const{data:{user}}=await supabase.auth.getUser();
    
    console.log(user.id)
  
  const response = await supabase
    .from("debates")
    .insert({
      user_id: user.id,
      topic : "College is overrated",
      mode: "Professor",
    })
    .select()
    
    console.log(response);
  
  }




  return (
    <div>
      <button onClick={createDebate} >Start Debate</button>
    </div>
  );
}

export default CreateDebate;