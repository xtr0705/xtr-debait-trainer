import supabase from '../lib/supabase.js';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAIResponse } from '../lib/gemini.js';

function ChatDebate() {
  const [debateinfo, setDebateInfo] = useState(null);
  const { debateId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiIsThinking, setAiIsthinking] = useState(false);
  const navigate = useNavigate();

  const debateOver = async () => {
    const { error } = await supabase.from('debates').update({
      ended_at: new Date().toISOString(),
      status: 'Finished'
    }).eq('id', debateId);
    if (error) {
      console.log(error);
    } else {
      await generateAIResult(messages);
      navigate(`/DebateReport/${debateId}`);
    }
  }

  const generateAIResult = async (convoMessages) => {
    try {
      const transcriptArray = convoMessages.map(
        (message) => `${message.sender}:${message.message}`
      );
      const convoHistory = transcriptArray.join("\n\n");
      const prompt = `
You are an expert debate judge.

Analyze the user's performance in this debate.

Topic:
${debateinfo.topic}

Mode:
${debateinfo.mode}

Conversation:
${convoHistory}

Evaluate ONLY the USER'S performance.

Scoring Rules:

- persuasion_score: Score from 0 to 100 based on how convincing the user was.
- logic_score: Score from 0 to 100 based on reasoning quality and consistency.
- overall_score: Score from 0 to 100 combining persuasion and logic.
- strongest_argument: The user's strongest argument from the debate.
- weakest_argument: The user's weakest argument from the debate.
- improvement_tip: One practical suggestion for improvement.
- winner: Must be either "user", "ai", or "draw".

Do not inflate scores.
Average performance should be around 50-70.
Reserve scores above 90 for exceptional debates.

Return ONLY valid JSON.

Example format:

{
  "persuasion_score": 85,
  "logic_score": 78,
  "overall_score": 82,
  "strongest_argument": "The user's strongest point.",
  "weakest_argument": "The user's weakest point.",
  "improvement_tip": "Use more evidence to support claims.",
  "winner": "user"
}
`;
      const reportText = await getAIResponse(prompt);
      console.log(reportText);
      const report = JSON.parse(reportText);
      try {
        const { data, error } = await supabase.from('debate_reports').insert({
          debate_id: debateId,
          persuasion_score: report.persuasion_score,
          logic_score: report.logic_score,
          strongest_argument: report.strongest_argument,
          weakest_argument: report.weakest_argument,
          improvement_tip: report.improvement_tip,
          overall_score: report.overall_score,
          winner: report.winner
        })
        .select('*')
        .single()

        if (error) {
          console.log(error);
          return;
        }
      } catch (error) {
        console.log(error)
      }

    } catch (error) {
      console.log(error);
    }
  }

  const generateAIResponse = async (convoMessages) => {
    try {
      const transcriptArray = convoMessages.map(
        (message) => `${message.sender}: ${message.message}`
      );
      const convoHistory = transcriptArray.join("\n\n");
      const prompt = `
      You are participating in a debate.

      Topic:${debateinfo.topic}

      Mode:${debateinfo.mode}

      Stay in character.
      Challenge the user's arguments.
      Do not agree unless logically forced.
      Keep responses under 120 words.
      Don't use hashtags in your arguements aswell.
      Use accurate and well-reasoned arguments.
      If unsure about a factual claim, avoid making it confidently.

      Conversation:${convoHistory} `;
      const aiResponse = await getAIResponse(prompt);
      const { data, error } = await supabase.from('debate_messages').insert({
        sender: 'ai',
        debate_id: debateId,
        message: aiResponse
      }).select('*').single();
      if (error) {
        console.log(error);
      }
      setMessages(prev => [...prev, data]);
    }
    catch (error) {
      console.log(error);
    } finally {
      setAiIsthinking(false);
    }
  }

  const sendMessage = async () => {
    if (!debateinfo) return;
    if (newMessage.trim() === '') {
      alert('Please enter a message');
      return;
    }
    const { data, error } = await supabase.from('debate_messages').insert({
      sender: 'user',
      debate_id: debateId,
      message: newMessage
    }).select('*').single();
    if (error) {
      console.log(error);
    } else {
      setAiIsthinking(true);
      const updatedMessages = [...messages, data];
      setMessages(prev => [...prev, data]);
      setNewMessage('');
      await generateAIResponse(updatedMessages);
    }
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('debate_messages')
      .select('*')
      .eq('debate_id', debateId)
      .order('created_at', { ascending: true });
    if (error) {
      console.log(error);
    } else {
      setMessages(data);
    }
  }


  const fetchDebateInfo = async () => {
    const { data, error } = await supabase.from('debates').select('*').eq('id', debateId).single();
    if (error) {
      console.log(error);
    } else {
      setDebateInfo(data);
    }
  }

  useEffect(() => {
    fetchDebateInfo();
    fetchMessages();
  }, []);


  return (
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
          {messages.map((message) => (
            <div key={message.id}>
              <p>{message.message}</p>
              <small>{new Date(message.created_at).toLocaleString()}</small>
            </div>

          ))}
          {aiIsThinking && (
            <p>AI is thinking...</p>
          )}
        </div>
      )}

      <div>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message here..." className="border-2 border-gray-300 rounded-md p-2 w-full mb-4" />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={aiIsThinking}
          onClick={sendMessage}
        >
          {aiIsThinking ? "AI Thinking..." : "Send"}
        </button>
        <button onClick={debateOver} >End debate</button>
      </div>
    </div>
  )

}
export default ChatDebate;