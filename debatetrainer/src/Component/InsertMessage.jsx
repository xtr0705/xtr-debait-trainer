import { supabase } from "../lib/supabase";
function InsertMessage() {
  const insertMessage = async ()=>{

    const object = await supabase.auth.getUser();
    const data = object.data.user;
    console.log(data);



    const response = await supabase
      .from("debate_messages")
      .insert({
        debate_id:"6e69e7d4-4dcc-442a-8aef-71e98e6d93ca",
        sender:"ai",
        message:"hi this is a message from ai"
      })
      .select("*")

    console.log(response);
  }
  return (
    <div>
      <button onClick={insertMessage} >insert message</button>
    </div>
  );
}

export default InsertMessage;