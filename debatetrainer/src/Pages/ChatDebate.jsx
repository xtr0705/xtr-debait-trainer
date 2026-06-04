import supabase from '../lib/supabase.js';
import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { getAIResponse } from '../lib/gemini.js';

function ChatDebate(){
  const [debateinfo,setDebateInfo] = useState(null);
  const {debateId}=useParams();
  const [messages,setMessages] = useState([]);
  const [newMessage,setNewMessage]=useState('');

  const generateAIResponse = async()=>{
    const transcriptArray = messages.map(
      (message)=> `${message.sender}: ${message.message}`
    );

    const convoHistory = transcriptArray.join("\n\n");

    const prompt = `
    You are participating in a debate.

    Topic:${debateinfo.topic}

    Mode:${debateinfo.mode}

    Conversation:${convoHistory}

    Respond as the AI debater.
    `;

    const aiResponse = await getAIResponse(prompt);

    const {data,error} = await supabase.from('debate_messages').insert({
      sender:'ai',
      debateId:debateId,
      message:aiResponse
    }).select('*').single();
    if (error) {
      console.log(error)
    }else{
      setMessages(prev=>[...prev,data]);
      setNewMessage
    }

  }

  const sendMessage = async()=>{
    if(newMessage.trim() === ''){
      alert('Please enter a message');
      return;
    }

    const {data,error} = await supabase.from('debate_messages').insert({
      debate_id:debateId,
      message:newMessage
     }).select('*').single();
      if(error){
        console.log(error);

      }else{
        setMessages(prev=>[...prev,data]);
        setNewMessage('');
      }
  }

  const fetchMessages = async ()=>{
    const {data,error}= await supabase
      .from('debate_messages')
      .select('*')
      .eq('debate_id',debateId)
      .order('created_at',{ascending:true});
    if(error){
      console.log(error);
    }else{
      setMessages(data);
    }
  }


  const fetchDebateInfo = async ()=>{
    const {data,error} = await supabase.from('debates').select('*').eq('id',debateId).single();
    if(error){
      console.log(error);
    }else{
      setDebateInfo(data);
    }
  }

  useEffect(()=>{
    fetchDebateInfo();
    fetchMessages();
  },[]);

  
  return(
    <div>
      <h1>Chat Debate Page</h1>
      {debateinfo && (
        <div>
          <h2>Debate Topic: {debateinfo.topic}</h2>
          <p>Mode: {debateinfo.mode}</p>
          <p>Duration: {debateinfo.duration} minutes</p>
        </div>
      )}

      {messages.length > 0 && (
        <div>
          <h2>Messages:</h2>
          {messages.((message)=>(
            <div key={message.id}>
              <p>{message.message}</p>
              <small>{new Date(message.created_at).toLocaleString()}</small>
            </div>
            
          ))}
        </div>
      )}

      <div>
        <input type="text" value={newMessage} onChange = {(e)=>setNewMessage(e.target.value)} placeholder="Type your message here..." className="border-2 border-gray-300 rounded-md p-2 w-full mb-4" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )

}
export default ChatDebate;