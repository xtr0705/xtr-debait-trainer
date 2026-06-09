import { useNavigate, useParams } from "react-router-dom";
import supabase from "../lib/supabase";
import { useEffect, useState } from "react";

function DebateReport() {
  const navigate = useNavigate();
  const { debateId } = useParams();
  const [report, setReport] = useState(null); 

  useEffect(() => {
    const FetchReport = async () => {
      try {
        const { data, error } = await supabase
          .from('debate_reports')
          .select('*')
          .eq('debate_id', debateId)
        if (error) {
          console.log(error)
        } else {
          console.log(data);
          setReport(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchReport();
  }, [debateId])

  if (!report) {
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
      Loading Report...
    </p>

  </div>
</div>
    );
  }

  return (
   <div className="
min-h-screen
bg-[#09090B]
text-white
relative
overflow-hidden
">
  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_50%)]
      pointer-events-none
    "
  />

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-14">

  <p className="text-zinc-500 uppercase tracking-widest mb-4">
    AI Evaluation Report
  </p>

  <h1 className="text-5xl font-serif mb-4">
    Debate Result
  </h1>

  <h2 className="text-2xl text-zinc-300">
    {report[0].topic}
  </h2>

</div>

        <div
  className="
    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-violet-500/20

    p-10

    text-center

    shadow-[0_0_40px_rgba(139,92,246,0.08)]

    mb-10
  "
>

  <p className="text-zinc-500 uppercase tracking-widest mb-3">
    Final Verdict
  </p>


  <h3 className="text-4xl font-serif capitalize">
    {report[0].winner}
  </h3>

</div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div
  className="
    group

    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    p-8

    transition-all
    duration-300

    hover:border-violet-500/40
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
  "
>
            <h3 className="text-zinc-500 mb-3">
              Persuasion Score
            </h3>

            <p className="text-5xl font-bold">
              {report[0].persuasion_score}
            </p>
          </div>

          <div
  className="
    group

    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    p-8

    transition-all
    duration-300

    hover:border-violet-500/40
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
  "
>
            <h3 className="text-zinc-500 mb-3">
              Logic Score
            </h3>

            <p className="text-5xl font-bold">
              {report[0].logic_score}
            </p>
          </div>

          <div
  className="
    group

    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    p-8

    transition-all
    duration-300

    hover:border-violet-500/40
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
  "
>
            <h3 className="text-zinc-500 mb-3">
              Overall Score
            </h3>

            <p className="text-5xl font-bold">
              {report[0].overall_score}
            </p>
          </div>

        </div>

        <div className="space-y-6">

          <div
  className="
    group

    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    
    p-8

    transition-all
    duration-300

    hover:border-violet-500/40
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
  "
>
            <h2 className="text-xl font-semibold mb-3 text-green-400 border-green-500/20">
              Strongest Argument
            </h2>

            <p className="text-slate-300 leading-relaxed">
              {report[0].strongest_argument}
            </p>
          </div>

          <div
  className="
    group

    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    p-8

    transition-all
    duration-300

    hover:border-violet-500/40
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
  "
>
            <h2 className="text-xl font-semibold mb-3 text-red-400 border-red-500/20">
              Weakest Argument
            </h2>

            <p className="text-slate-300 leading-relaxed">
              {report[0].weakest_argument}
            </p>
          </div>

          <div
  className="
    group

    bg-gradient-to-br
    from-zinc-900
    to-black

    border
    border-zinc-800

    p-8

    transition-all
    duration-300

    hover:border-violet-500/40
    hover:-translate-y-1
    hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
  "
>
            <h2 className="text-xl font-semibold mb-3 text-blue-400 border-blue-500/20">
              Improvement Tip
            </h2>

            <p className="text-slate-300 leading-relaxed">
              {report[0].improvement_tip}
            </p>

          </div>

          <div className="flex justify-center gap-7.5" >

            <button
className="
group
relative
overflow-hidden

bg-violet-500
text-white

px-8
py-4

font-semibold

transition-all
duration-300

hover:bg-violet-400
hover:-translate-y-0.5
hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
"
>
Home
</button>
            <button className="
border
border-zinc-800

bg-zinc-900/50

px-8
py-4

transition-all
duration-300

hover:border-violet-500/40
hover:bg-zinc-900
hover:-translate-y-0.5

hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]
"
            onClick={()=>{
              navigate('/History/:user_id');
            }}
            >History</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DebateReport;