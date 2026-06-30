import { useState } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import Tap from "../Component/Tap";

function CreateDebate() {
  const [debateTopic, setDebateTopic] = useState("");
  const [debateMode, setDebateMode] = useState("professional");
  const [debateDuration, setDebateDuration] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createDebate = async () => {
    if (!debateTopic.trim()) {
      alert("Please enter a debate topic");
      return;
    }
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('You must be logged in to create a debate');
      navigate('/login');
      console.error('Auth error : ', userError);
      return;
    }

    const { data, error } = await supabase
      .from("debates")
      .insert({
        topic: debateTopic,
        mode: debateMode,
        duration: debateDuration,
        user_id: user.id
      })
      .select("*")
      .single();

    if (error) {
      alert("Error create debate");
      console.log("db error: ", error)
      return;
    } else {
      const debateId = data.id;
      setLoading(true);
      navigate(`/debate/${debateId}`);
    }
  }

  const debateModes = [
    {
      value: "professional",
      label: "Professional Debater",
    },
    {
      value: "aggressive",
      label: "Aggressive Responder",
    },
    {
      value: "job-interview",
      label: "Job Interviewer",
    },
    {
      value: "lawyer",
      label: "Lawyer",
    },
    {
      value: "philosopher",
      label: "Philosopher",
    },
    {
      value: "twitter-troll",
      label: "Twitter Troll",
    },
    {
      value: "devils-advocate",
      label: "Devil's Advocate",
    },
  ];
  const durations = [
    {
      value: 5,
      label: "5 Minutes",
    },
    {
      value: 10,
      label: "10 Minutes",
    },
    {
      value: 15,
      label: "15 Minutes",
    },
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">

        <div className="text-center">

          <div className="flex justify-center gap-2 mb-4">

            <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />

            <div
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />

            <div
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />

          </div>

          <p className="text-zinc-400">
            Creating Debate...
          </p>

        </div>

      </div>
    );
  } else {

    return (
      <>
        <div className="min-h-screen bg-[#09090B] text-white relative overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_50%)]" />

          <div className="relative flex items-center justify-center min-h-screen px-6">

            <div className="w-full max-w-2xl">


              <div className="mb-10 text-center">

                <p className="text-slate-500 uppercase tracking-widest mb-4">
                  DebateArena
                </p>

                <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">                Create A New Debate
                </h1>

                <p className="text-slate-400 text-lg">
                  Choose a topic, select an opponent,
                  and put your arguments to the test.
                </p>

                <div className="flex justify-center gap-3 mt-6">

                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <div className="w-2 h-2 rounded-full bg-orange-400" />

                </div>

              </div>

              <div
                className="
    relative
    overflow-hidden

    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    p-6 md:p-8

    shadow-[0_0_40px_rgba(139,92,246,0.05)]
  "
              >
                <div className="mb-6">

                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Debate Topic
                  </label>

                  <input
                    placeholder="e.g. College is overrated"
                    className="
        w-full
        bg-black/50
        border border-zinc-800
        px-4
        py-4
        text-white
        placeholder:text-slate-500
        focus:outline-none
        focus:border-violet-500
        transition
      "
                    value={debateTopic}
                    onChange={(e) => setDebateTopic(e.target.value)}
                  />

                </div>

                <div className="mb-6">

                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Opponent Style
                  </label>

                  <Listbox value={debateMode} onChange={setDebateMode}>
                    <div className="relative">

                      <Listbox.Button
                        className="
        w-full
        bg-black/50
        focus:outline-none
        focus:border-violet-500
        
        border
        border-zinc-800
        px-4
        py-4
        text-left
        hover:border-slate-700
        transition-all
        duration-300
      "
                      >
                        {debateMode
                          ? debateModes.find(
                            (mode) => mode.value === debateMode
                          )?.label
                          : "Select Debate Mode"}
                      </Listbox.Button>

                      <Listbox.Options
                        className="
    absolute
    z-50
    mt-2
    w-full

    max-h-48
    overflow-y-auto

    rounded-xl

    border
    border-zinc-800

    bg-gradient-to-b
    from-zinc-900
    to-black

    shadow-2xl
  "
                      >
                        {debateModes.map((mode) => (
                          <Listbox.Option
                            key={mode.value}
                            value={mode.value}
                          >
                            {({ active, selected }) => (
                              <div
                                className={`
    px-4
    py-4

    cursor-pointer

    transition-all
    duration-200

    ${active
                                    ? "bg-violet-500/10 text-violet-200"
                                    : ""
                                  }

    ${selected
                                    ? "text-violet-300"
                                    : "text-white"
                                  }
  `}
                              >
                                {mode.label}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>

                    </div>
                  </Listbox>

                </div>





                <div className="mb-8">

                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Debate Duration
                  </label>

                  <div className="relative">

                    <Listbox
                      value={debateDuration}
                      onChange={setDebateDuration}
                    >

                      <Listbox.Button
                        className="
    w-full
    bg-black/50
    border
    border-zinc-800
    px-4
    py-4
    text-left
    text-white

    focus:outline-none
    focus:border-violet-500

    hover:border-violet-500/30

    transition-all
    duration-300
  "
                      >
                        {
                          durations.find(
                            (duration) =>
                              duration.value === debateDuration
                          )?.label
                        }
                      </Listbox.Button>

                      <Listbox.Options
                        className="
    absolute
    left-0
    top-full
    mt-2
    z-[999]

    w-full

    rounded-xl

    border
    border-zinc-800

    bg-gradient-to-b
    from-zinc-900
    to-black

    shadow-2xl

    overflow-hidden
  "
                      >

                        {durations.map((duration) => (

                          <Listbox.Option
                            key={duration.value}
                            value={duration.value}
                          >
                            {({ active, selected }) => (

                              <div
                                className={`
    px-4
    py-4

    cursor-pointer

    transition-all
    duration-200

    ${active
                                    ? "bg-violet-500/10 text-violet-200"
                                    : ""
                                  }

    ${selected
                                    ? "text-violet-300"
                                    : "text-white"
                                  }
  `}
                              >
                                {duration.label}
                              </div>

                            )}
                          </Listbox.Option>

                        ))}

                      </Listbox.Options>

                    </Listbox>

                  </div>

                </div>

              </div>

              <div className="flex gap-4 justify-center ">

                <Tap>
                  <button
                    onClick={createDebate}
                    className="
      group
      relative
      overflow-hidden

      w-full

      px-4
      bg-violet-500
      text-white

      py-4
      mt-6
      mb-6

      font-semibold

      transition-all
      duration-300

      hover:bg-violet-400
      hover:-translate-y-0.5
      hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
    "
                  >

                    <span
                      className="
        absolute
        top-0
        left-[-150%]
        h-full
        w-[50%]

        bg-gradient-to-r
        from-transparent
        via-white/20
        to-transparent

        skew-x-12

        group-hover:left-[150%]

        transition-all
        duration-700
      "
                    />

                    <span className="relative">
                      Start Debate
                    </span>

                  </button>
                </Tap>
              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default CreateDebate;