import { useParams } from "react-router-dom";
import supabase from "../lib/supabase";
import { useEffect, useState } from "react";

function DebateReport() {
  const { debateId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const FetchReport = async () => {
      try {
        const { data, error } = await supabase
          .from('debate_reports')
          .select('*')
          .eq('debate_id', debateId)
          .single();
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Report...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Debate Result
          </h1>

          <h2>{report.topic}</h2>

          <p className="text-slate-400 mt-2">
            AI Evaluation Summary
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            🏆 Winner
          </h2>

          <p className="text-3xl font-bold text-green-400 capitalize">
            {report.winner}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-slate-400 mb-2">
              Persuasion Score
            </h3>

            <p className="text-4xl font-bold">
              {report.persuasion_score}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-slate-400 mb-2">
              Logic Score
            </h3>

            <p className="text-4xl font-bold">
              {report.logic_score}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-slate-400 mb-2">
              Overall Score
            </h3>

            <p className="text-4xl font-bold">
              {report.overall_score}
            </p>
          </div>

        </div>

        <div className="space-y-6">

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold mb-3 text-green-400">
              Strongest Argument
            </h2>

            <p className="text-slate-300 leading-relaxed">
              {report.strongest_argument}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold mb-3 text-red-400">
              Weakest Argument
            </h2>

            <p className="text-slate-300 leading-relaxed">
              {report.weakest_argument}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold mb-3 text-blue-400">
              Improvement Tip
            </h2>

            <p className="text-slate-300 leading-relaxed">
              {report.improvement_tip}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DebateReport;