import supabase from '../lib/supabase.js';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {motion} from "framer-motion";
import { getAIResponse } from '../lib/gemini.js';
import Tap from '../Component/Tap.jsx';

function ChatDebate() {
  const [debateinfo, setDebateInfo] = useState(null);
  const { debateId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiIsThinking, setAiIsthinking] = useState(false);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  const [showEndModal, setShowEndModal] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const loadingMessages = [
  "Analyzing debate transcript...",
  "Evaluating reasoning quality...",
  "Measuring persuasion strength...",
  "Identifying strongest arguments...",
  "Generating improvement feedback...",
  "Finalizing report..."
];

const [loadingText, setLoadingText] = useState(
  loadingMessages[0]
);
// const[debateTimer,setDebateTimer]=useState(0);


  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages])

  const confirmEndDebate = async ()=>{
    setIsGeneratingReport(true);

    const { error } = await supabase
      .from("debates")
      .update({
        ended_at: new Date().toISOString(),
        status: "Finished",
      })
      .eq("id", debateId);
  
    if (error) {
      console.log(error);
      setIsGeneratingReport(false);
    } else {
      const success = await generateAIResult(messages);

      if (!success) {
        setIsGeneratingReport(false);

        alert(
          "Failed to generate debate report. Please try again."
        );

        return;
      }

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

* persuasion_score: Score from 0 to 100 based on how convincing and persuasive the user's arguments were.
* logic_score: Score from 0 to 100 based on reasoning quality, consistency, rebuttals, and avoidance of logical fallacies.
* overall_score: Score from 0 to 100 representing the user's overall debate performance.
* strongest_argument: The user's strongest argument from the debate.
* weakest_argument: The user's weakest argument from the debate.
* improvement_tip: Practical suggestions for improvement. Keep it under 100 words.
* winner: Must be either "user", "ai", or "draw".

Scoring Guidelines:

* 0-39: Very weak performance with major reasoning flaws.
* 40-59: Below average performance with noticeable weaknesses.
* 60-74: Average performance with both strengths and weaknesses.
* 75-89: Strong performance with persuasive arguments, sound reasoning, and effective rebuttals.
* 90-100: Exceptional performance. Reserve this range for truly outstanding debates.

Important Instructions:

* Be objective and consistent.
* Do not inflate scores, but do not underrate good arguments.
* Reward clear reasoning, effective rebuttals, consistency, and successful defense of claims.
* The AI is NOT automatically correct or superior. Judge both sides solely on the quality of the arguments presented.

Winner Rules:

* Return "user" if the user's overall arguments, reasoning, and rebuttals were stronger.
* Return "ai" if the AI's overall arguments were stronger.
* Return "draw" only if both sides performed at a very similar level.
* Do not default to "draw" simply because the debate was close. Choose a winner whenever one side performed noticeably better.


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
      if (!reportText) {
        alert(
          "AI is currently busy. Please try again in a few moments."
        );    

        
        return false;
      }

      const cleaned = reportText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      console.log("RAW GEMINI:", reportText);
      const report = JSON.parse(cleaned);
      console.log("PARSED REPORT:", report);

      try {
        const {data:userData} = await supabase.auth.getUser();
        const { error } = await supabase
          .from('debate_reports')
          .insert({
          debate_id: debateId,
          persuasion_score: report.persuasion_score,
          logic_score: report.logic_score,
          strongest_argument: report.strongest_argument,
          weakest_argument: report.weakest_argument,
          improvement_tip: report.improvement_tip,
          overall_score: report.overall_score,
          winner: report.winner,
          topic:debateinfo.topic,
          user_id:userData.user.id
        })
          .select('*')
          .single()

        if (error) {
          console.log(error);
          return false;
        }
        return true;

      } catch (error) {
        console.log(error)
        return false;
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
      Keep responses under 80-100 words.
      Don't use hashtags in your arguements aswell.
      Don't always quote in your arguements.
      Use accurate and well-reasoned arguments.
      If unsure about a factual claim, avoid making it confidently.

      Conversation:${convoHistory} `;
      const aiResponse = await getAIResponse(prompt);
      if (!aiResponse) {
        alert(
          "AI is currently busy. Please try again in a few moments."
        );
        setAiIsthinking(false);
        return;
      }
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

  // const timer = async ()=>{
  //   const {data,error} = await supabase.from('debates').
  // }




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
        setShowEndModal(true);
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

  useEffect(() => {
  if (!isGeneratingReport) return;

  let index = 0;

  const interval = setInterval(() => {
    index = (index + 1) % loadingMessages.length;

    setLoadingText(
      loadingMessages[index]
    );
  }, 2000);

  return () => clearInterval(interval);

}, [isGeneratingReport]);

  const modeNames = {
  professional: "Professional Debater",
  aggressive: "Aggressive Challenger",
  lawyer: "Lawyer",
  philosopher: "Philosopher",
  "twitter-troll": "Twitter Troll",
  "devils-advocate": "Devil's Advocate",
  "job-interview": "Job Interviewer",
};

  const modeColors = {
  professional: {
    bgGlow: "rgba(59,130,246,0.12)",
    border: "border-blue-500/30",
    accent: "text-blue-400"
  },

  lawyer: {
    bgGlow: "rgba(16,185,129,0.12)",
    border: "border-emerald-500/30",
    accent: "text-emerald-400"
  },

  philosopher: {
    bgGlow: "rgba(139,92,246,0.12)",
    border: "border-violet-500/30",
    accent: "text-violet-400"
  },

  aggressive: {
    bgGlow: "rgba(239,68,68,0.12)",
    border: "border-red-500/30",
    accent: "text-red-400"
  },

  "twitter-troll": {
    bgGlow: "rgba(249,115,22,0.12)",
    border: "border-orange-500/30",
    accent: "text-orange-400"
  },

  "devils-advocate": {
    bgGlow: "rgba(245,158,11,0.12)",
    border: "border-amber-500/30",
    accent: "text-amber-400"
  },

  "job-interview": {
    bgGlow: "rgba(6,182,212,0.12)",
    border: "border-cyan-500/30",
    accent: "text-cyan-400"
  }
};

  const theme =
    modeColors[debateinfo?.mode] ||
    modeColors.professional;

    

  return (
    <motion.div
  initial={{
    opacity: 0,
    y: 20
  }}
  animate={{
    opacity: 1,
    y: 0
  }}
  transition={{
    duration: 0.4
  }}
    
    className="
min-h-screen
bg-[#09090B]
text-white
flex
flex-col
relative

">
      <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background: `radial-gradient(
      circle at top,
      ${theme.bgGlow},
      transparent 50%
    )`
  }}
/>

      <div className="border-b bg-[#09090B]/80
border-zinc-800
backdrop-blur-xl backdrop-blur sticky top-0 z-10">

        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-xl md:text-2xl font-serif">
  {debateinfo?.topic}
</h1>

<p
  className={`
    text-sm
    mt-1
    font-medium
    ${theme.accent}
  `}
>
{modeNames[debateinfo?.mode]}</p>

          </div>

          <Tap>
            <button
              onClick={() => setShowEndModal(true)}
              className="
            bg-red-500/10
            border
            border-red-500/30
            text-red-400
            px-5
            py-2
            hover:bg-red-500/20
            transition
          "
            >
              End Debate
            </button>
          </Tap>

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
              max-w-[90%] md:max-w-2xl
              px-5
              py-4
              ${message.sender === "user"
                    ? "bg-zinc-200 text-black "
                    : `bg-gradient-to-br
from-zinc-900
to-black border ${theme.border}`
                  }
            `}
              >

                <div className="flex items-center gap-2 mb-2">

                  <div
                    className={`
      w-2 h-2
      ${message.sender === "user"
                        ? "bg-black"
                        : theme.accent.replace("text", "bg")
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

              <div
  className={`
    bg-gradient-to-br
    from-zinc-900
    to-black
    border
    ${theme.border}
    px-5
    py-4
  `}
>

                <div className="flex gap-2">

                  <div className="w-2 h-2 bg-slate-500 animate-bounce"></div>

                  <div
                    className="w-2 h-2 bg-slate-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>

                  <div
                    className="w-2 h-2 bg-slate-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>

                </div>

              </div>

            </div>
          )}

        </div>

        <div ref={messageRef}></div>
      </div>


      <div className="border-t border-slate-800 bg-[#09090B]
border-zinc-800">

        <div className="max-w-5xl w-full sm:w-auto mx-auto p-6 flex sm:flex-row gap-4">

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
            className={`
flex-1
bg-black/50
border-zinc-800
border
border-slate-800
px-5
py-4
text-white
placeholder:text-slate-500
focus:outline-none
${theme.border}
`}
          />

          <Tap>
            <button
              disabled={aiIsThinking}
              onClick={sendMessage}
              className="
            bg-violet-500
            text-white
            py-5
            w-[80px]
            font-semibold
            hover:bg-violet-400
            hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
            transition
            disabled:opacity-50
          "
            >
              Send
            </button>
          </Tap>

        </div>

      </div>
      {isGeneratingReport && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center

      bg-black/80
      backdrop-blur-md
    "
  >

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      className="
        text-center
        px-8
        max-w-md
      "
    >

      <div
        className={`
          w-16
          h-16
          mx-auto
          mb-6

          rounded-full

          border-2
          border-transparent

          animate-spin

          ${theme.border}
        `}
      />

      <h2 className="text-3xl font-serif mb-4">
        Generating Report
      </h2>

      <motion.p
        key={loadingText}
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="
          text-zinc-400
        "
      >
        {loadingText}
      </motion.p>

    </motion.div>

  </motion.div>
)}

      {showEndModal && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-sm
    "
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="
        w-full
        max-w-md
        mx-4

        bg-gradient-to-br
        from-zinc-900
        to-black

        border
        border-red-500/30

        p-8

        shadow-[0_0_40px_rgba(239,68,68,0.08)]
      "
    >

      <div className="flex items-center gap-3 mb-5">

        <div
          className="
            w-10
            h-10
            flex
            items-center
            justify-center

            bg-red-500/10
            border
            border-red-500/20

            text-red-400
            text-xl
          "
        >
          ⚠
        </div>

        <h2 className="text-2xl font-serif">
          End Debate?
        </h2>

      </div>

      <p className="text-zinc-400 leading-relaxed mb-8">
        This debate will be finalized immediately.
        A performance report will be generated and
        you won't be able to continue the discussion.
      </p>

      <div className="flex gap-3">

        <Tap>
          <button
          onClick={() => setShowEndModal(false)}
          className="
            flex-1

            border
            border-zinc-800

            py-3
            px-3

            hover:border-zinc-700
            hover:bg-zinc-900

            transition-all
            duration-300
          "
        >
          Continue Debate
          </button>
        </Tap>

        <Tap>
          <button
            onClick={async () => {
    setShowEndModal(false);
    await confirmEndDebate();
  }}
            className="
              flex-1

              bg-red-500
              text-white

              py-3
              px-3

              hover:bg-red-400
              hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]

              transition-all
              duration-300
            "
          >
            End Debate
          </button>
        </Tap>

      </div>

    </motion.div>
  </motion.div>
)}

    </motion.div>
  )

}
export default ChatDebate;