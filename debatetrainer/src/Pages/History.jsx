import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { useEffect, useState } from "react";
import Tap from "../Component/Tap";


function DebateHistory() {

  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('debate_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false
        });

      if (error) {
        console.log(error);
      } else {
        setHistory(data || [])
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);


  if (loading) {
    return (
      <div className="
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
            Loading History...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div
  className="
    min-h-screen
    bg-[#09090B]
    text-white
    relative
    overflow-hidden
  "
>
  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_50%)]
      pointer-events-none
    "
  />


  <div className="relative border-b border-zinc-800 bg-[#09090B]/80 backdrop-blur-xl">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

    <h2 className="font-serif text-lg sm:text-xl">
      DebateArena
    </h2>

    <div className="flex justify-center gap-3 w-full sm:w-auto">

      <Tap>
        <button
          onClick={() => navigate("/")}
          className="
            w-32 sm:w-auto

            border
            border-zinc-800

            px-5
            py-2

            hover:border-violet-500/30
            hover:bg-zinc-900

            transition-all
            duration-300
          "
        >
          Home
        </button>
      </Tap>

      <Tap>
        <button
          onClick={() => navigate("/leaderboard")}
          className="
            w-32 sm:w-auto

            bg-violet-500
            text-white

            px-5
            py-2

            hover:bg-violet-400
            hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]

            transition-all
            duration-300
          "
        >
          Leaderboard
        </button>
      </Tap>

    </div>

  </div>
</div>

      <div className="relative p-6">

        <div className="max-w-6xl mx-auto">

          <div className="mb-14 text-center">

            <p className="text-zinc-500 uppercase tracking-widest mb-4">
              Your Performance Archive
            </p>

            <h1 className="text-5xl font-serif mb-4">
              Debate History
            </h1>

            <p className="text-zinc-400">
              Review previous debates and track your growth.
            </p>

          </div>

          <div className="space-y-4">

            {history.length === 0 ? (
              <div className="text-center py-32">

                <h2 className="text-3xl font-serif mb-4">
                  No Debates Yet
                </h2>

                <p className="text-zinc-400 mb-8">
                  Start your first debate and your reports will appear here.
                </p>

                <Tap>
                  <button
                    onClick={() => navigate("/create-debate")}
                    className="
        bg-violet-500
        px-8
        py-4

        transition-all
        duration-300

        hover:bg-violet-400
        hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
      "
                  >
                    Start Debate
                  </button>
                </Tap>

              </div>
            ) : (


              history.map((report) => (

                <div
                  key={report.id}
                  className="
              
              border
              bg-linear-to-br
from-zinc-900
to-black

border-zinc-800

transition-all
duration-300

hover:border-violet-500/30
hover:-translate-y-1

hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
              rounded
              p-6
             
              
              
              "
                >

                  <div className="flex flex-col sm:flex-row
gap-4
sm:justify-between
sm:items-start">

                    <div>

                      <h2 className="text-xl font-semibold">
                        {report.topic}
                      </h2>

                      <p className="text-zinc-500 text-sm mt-1">
                        {new Date(report.created_at).toLocaleDateString()}
                      </p>

                    </div>

                    <div
                      className={`
                    px-3
                    py-1
                    rounded
                    uppercase tracking-wide
                text-sm
                font-medium
                
                ${report.winner === "user"
                          ? "bg-green-500/10 text-green-400"
                          : report.winner === "ai"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }
                    `}
                    >
                      {report.winner}
                    </div>

                  </div>

                  <div onClick={(e) => {

                    e.stopPropagation();
                    navigate(`/DebateReport/${report.debate_id}`)
                  }
                  } className="mt-6 flex flex-col sm:flex-row
gap-4
sm:items-center
sm:justify-between">

                    <div>

                      <p className="text-zinc-500 text-sm">
                        Overall Score
                      </p>

                      <p className="text-4xl font-bold">
                      {report.overall_score} 
                          
                      </p>

                    </div>

                    <Tap>

                      <button
                        onClick={() =>
                          navigate(
                            `/DebateReport/${report.debate_id}`
                          )
                        }
                        className="
  group
  relative
  overflow-hidden

  bg-violet-500
  text-white

  px-5
  py-3
  cursor-pointer

  font-medium

  transition-all
  duration-300
  w-full sm:w-auto
  hover:bg-violet-400
  hover:-translate-y-0.5
  hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
  "
                      >
                        View Report
                      </button>
                    </Tap>

                  </div>

                </div>
              )

              ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default DebateHistory;