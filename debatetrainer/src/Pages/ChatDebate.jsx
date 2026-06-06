import supabase from '../lib/supabase.js';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {motion} from "framer-motion";
import { getAIResponse } from '../lib/gemini.js';

function ChatDebate() {
  const [debateinfo, setDebateInfo] = useState(null);
  const { debateId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiIsThinking, setAiIsthinking] = useState(false);
  const messageRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages])


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
- improvement_tip: practical suggestions for improvement. Should be under 100 words.
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

      const cleaned = reportText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      console.log(cleaned);

      const report = JSON.parse(cleaned);

      try {
        const { error } = await supabase.from('debate_reports').insert({
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




  useEffect(() => {
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
    fetchDebateInfo();
    fetchMessages();
  }, [debateId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        debateOver();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const modeColors = {
    professional: {
      glow: "from-blue-500/20",
      border: "border-blue-500/30",
      accent: "text-blue-400"
    },
    lawyer: {
      glow: "from-emerald-500/20",
      border: "border-emerald-500/30",
      accent: "text-emerald-400"
    },
    philosopher: {
      glow: "from-purple-500/20",
      border: "border-purple-500/30",
      accent: "text-purple-400"
    },
    aggressive: {
      glow: "from-red-500/20",
      border: "border-red-500/30",
      accent: "text-red-400"
    },
    "twitter-troll": {
      glow: "from-orange-500/20",
      border: "border-orange-500/30",
      accent: "text-orange-400"
    },
    "devils-advocate": {
      glow: "from-amber-500/20",
      border: "border-amber-500/30",
      accent: "text-amber-400"
    },
    "job-interview": {
      glow: "from-cyan-500/20",
      border: "border-cyan-500/30",
      accent: "text-cyan-400"
    }
  };

  const theme =
    modeColors[debateinfo?.mode] ||
    modeColors.professional;

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    
    className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      <div
        className={`
    absolute
    inset-0
    bg-gradient-to-br
    ${theme.glow}
    via-transparent
    to-transparent
    pointer-events-none
  `}
      />


      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">

        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-bold">
              {debateinfo?.topic}
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              {debateinfo?.mode} • {debateinfo?.duration} min
            </p>

          </div>

          <button
            onClick={debateOver}
            className="
          bg-red-500/10
          border
          border-red-500/30
          text-red-400
          px-5
          py-2
          rounded-xl
          hover:bg-red-500/20
          transition
        "
          >
            End Debate
          </button>

        </div>

      </div>


      <div className="flex-1 overflow-y-auto">

        <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

          {messages.map((message) => (

            <motion.div
              key={message.id}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.25,
              }}
              className={`flex ${message.sender === "user"
                  ? "justify-end"
                  : "justify-start"
                }`}
            >

              <div
                className={`
              max-w-2xl
              px-5
              py-4
              rounded-2xl
              ${message.sender === "user"
                    ? "bg-white text-black"
                    : "bg-slate-900 border border-slate-800"
                  }
            `}
              >

                <div className="flex items-center gap-2 mb-2">

                  <div
                    className={`
      w-2 h-2 rounded-full
      ${message.sender === "user"
                        ? "bg-black"
                        : "bg-blue-400"
                      }
    `}
                  />

                  <span
                    className={`
      text-xs font-medium uppercase tracking-wider
      ${message.sender === "user"
                        ? "text-black/60"
                        : "text-slate-500"
                      }
    `}
                  >
                    {message.sender === "user" ? "You" : "AI"}
                  </span>

                </div>

                <p className="leading-relaxed">
                  {message.message}
                </p>
              </div>

            </motion.div>

          ))}

          {aiIsThinking && (
            <div className="flex justify-start">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">

                <div className="flex gap-2">

                  <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>

                  <div
                    className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>

                  <div
                    className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>

                </div>

              </div>

            </div>
          )}

        </div>

        <div ref={messageRef}></div>
      </div>


      <div className="border-t border-slate-800 bg-slate-950">

        <div className="max-w-5xl mx-auto p-6 flex gap-4">

          <input
            value={newMessage}
            disabled={aiIsThinking}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !aiIsThinking) {
                sendMessage();
              }
            }}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Challenge the AI..."
            className="
          flex-1
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          px-5
          py-4
          text-white
          placeholder:text-slate-500
          focus:outline-none
          focus:border-blue-500
        "
          />

          <button
            disabled={aiIsThinking}
            onClick={sendMessage}
            className="
          bg-white
          text-black
          px-8
          rounded-xl
          font-semibold
          hover:bg-slate-200
          transition
          disabled:opacity-50
        "
          >
            Send
          </button>

        </div>

      </div>

    </motion.div>
  )

}
export default ChatDebate;