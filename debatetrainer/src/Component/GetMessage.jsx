import {supabase }from '../lib/supabase';
function GetMessage() {

  const getMessage = async ()=>{
    const object = await supabase.auth.getUser();
    const data = object.data.user;
    console.log(data);

    const response = await supabase
      .from("debate_messages")
      .select("*");

    console.log(response);
  }

  return (
    <div>
      <button onClick={getMessage} >get message</button>
    </div>
  );
}

export default GetMessage;