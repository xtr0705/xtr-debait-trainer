import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const Data = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user.id
      if (!userId) return;

      const { data: reports, error } = await supabase
        .from('debate_reports')
        .select(`
        user_id,
        persuasion_score,
        logic_score,
        overall_score,
        profiles(
          username
        )
      `);
      if (error) {
        console.log(error);
        return;
      }

      const users = {};
      reports.forEach(report => {
        const userId = report.user_id;

        if (!users[userId]) {
          users[userId] = {
            id: userId,
            username: report.profiles?.username ?? "Unknown",
            overallSum: 0,
            logicSum: 0,
            persuasionSum: 0,
            debateCount: 0
          };
        }

        users[userId].overallSum += report.overall_score;
        users[userId].logicSum += report.logic_score;
        users[userId].persuasionSum += report.persuasion_score;
        users[userId].debateCount += 1;
      })

      const sortedData = Object.values(users)
        .filter(user => user.debateCount >= 3)
        .map((user) => ({
          id: user.id,
          username: user.username,
          avgOverall: Number(user.overallSum / user.debateCount).toFixed(1),
          avgLogic: Number(user.logicSum / user.debateCount).toFixed(1),
          avgPersuasion: Number(user.persuasionSum / user.debateCount).toFixed(1),
          debateCount: user.debateCount,
        }))
      sortedData.sort(
        (a, b) => b.avgOverall - a.avgOverall
      );
      setLeaderboard(sortedData);

    }

    const fetchCurrentUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const id = user?.id;

      if (!id) return;

      const { data: reports, error } = await supabase
        .from('debate_reports')
        .select(`
            user_id,
            persuasion_score,
            logic_score,
            overall_score,
            profiles(
              username
              )
              `)
        .eq('user_id', id)
      if (error) {
        console.log(error);
        return;
      }

      const userFinalData = {};
      reports.forEach(report => {
        const userId = report.user_id;

        if (!userFinalData[userId]) {
          userFinalData[userId] = {
            username: report.profiles?.username || 'Unknown',
            overallSum: 0,
            logicSum: 0,
            persuasionSum: 0,
            debateCount: 0
          };
        }

        userFinalData[userId].overallSum += report.overall_score;
        userFinalData[userId].logicSum += report.logic_score;
        userFinalData[userId].persuasionSum += report.persuasion_score;
        userFinalData[userId].debateCount += 1;
      })

      const sortedData = Object.values(userFinalData)
        .filter(user => user.debateCount >= 3)
        .map((user) => ({
          username: user.username,
          avgOverall: Number(user.overallSum / user.debateCount).toFixed(1),
          avgLogic: Number(user.logicSum / user.debateCount).toFixed(1),
          avgPersuasion: Number(user.persuasionSum / user.debateCount).toFixed(1),
          debateCount: user.debateCount,
        }))
      sortedData.sort(
        (a, b) => b.avgOverall - a.avgOverall
      );

      setUserData(sortedData);
      setLoading(false);
    }

    Data()
    fetchCurrentUserData();
  }, [])

  const userFinalData = userData[0];

  useEffect(()=>{
    const setUserRank = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const id = user?.id;
      leaderboard.forEach((user, index) => {
        if (id === user.id) {
          setMyRank(index + 1);
        }
      })
    }
    if (leaderboard.length>0) {
      
      setUserRank();
    }
  },[leaderboard])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="flex justify-center mb-6">

            <div
              className="
          w-16
          h-16

          rounded-full

          border-2
          border-amber-500/20
          border-t-amber-400

          animate-spin
        "
            />

          </div>

          <h2 className="text-3xl font-serif text-amber-400 mb-3 animate-glow">
            Hall of Debaters
          </h2>

          <p className="text-zinc-400">
            Calculating rankings...
          </p>

        </div>

      </div>
    )
  } else {

    return (
      <div className="min-h-screen bg-black text-white px-4 py-10">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Leaderboard
            </h1>

            <p className="text-center text-slate-400 mt-3">
              Logic. Persuasion. Consistency. Ranked.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12 text-center">

            <h1 className="text-2xl font-heading md:text-5xl font-serif text-amber-400">
              Hall of Debaters
            </h1>

            <p className="mt-5 text-slate-300 font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
              The arena remembers every argument.
              Rise through the ranks by mastering logic,
              persuasion, and consistency.
            </p>

          </div>

          <div
            className="
          overflow-x-auto
          border
          border-zinc-800
          bg-zinc-950
        "
          >
            <table className="w-full">
              <thead>
                <tr
                  className="
                border-b
                border-zinc-800
                bg-zinc-900/50
              "
                >
                  <th className="px-6 py-4 text-left text-slate-400 font-medium">
                    Rank
                  </th>

                  <th className="px-6 py-4 text-left text-slate-400 font-medium">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-slate-400 font-medium">
                    Overall
                  </th>

                  <th className="px-6 py-4 text-left text-slate-400 font-medium">
                    Logic
                  </th>

                  <th className="px-6 py-4 text-left text-slate-400 font-medium">
                    Persuasion
                  </th>

                  <th className="px-6 py-4 text-left text-slate-400 font-medium">
                    Debates
                  </th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((user, index) => {
                  const rank =
                    index === 0
                      ? "#1"
                      : index === 1
                        ? "#2"
                        : index === 2
                          ? "#3"
                          : `#${index + 1}`;

                  return (
                    <tr
                      key={user.username}
                      className={`
                    border-b border-zinc-800
                    hover:bg-zinc-900/50
                    transition-colors

                    ${index === 0
                          ? "bg-yellow-500/20"
                          : ""
                        }
                  `}
                    >
                      <td className="px-6 py-5 animate-glow text-amber-200 font-bold text-lg">
                        {rank}
                      </td>

                      <td className="px-6 py-5 font-medium">
                        {user.username}
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-violet-400 font-bold text-lg">
                          {user.avgOverall}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-400">
                        {user.avgLogic}
                      </td>

                      <td className="px-6 py-5 text-slate-400">
                        {user.avgPersuasion}
                      </td>

                      <td className="px-6 py-5 text-slate-300">
                        {user.debateCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            className="
    max-w-8xl
    mx-auto
    mb-10
    mt-10
    border
    border-violet-500/20
    bg-zinc-950
    p-5
  "
          >
            <div className="flex items-center justify-between flex-wrap gap-4">

              <div>
                <p className="text-slate-400 text-sm">
                  Your Ranking
                </p>

                <h2 className="text-3xl font-bold text-violet-400">
                  {myRank}
                </h2>
              </div>

              <div className="flex gap-8 flex-wrap">

                <div>
                  <p className="text-slate-500 text-sm">
                    Overall
                  </p>

                  <p className="text-md font-bold text-violet-400">
                    {userData ? userFinalData.avgOverall : 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Logic
                  </p>

                  <p className="text-md text-slate-300">
                    {userData ? userFinalData.avgLogic : 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Persuasion
                  </p>

                  <p className="text-md text-slate-300">
                    {userData ? userFinalData.avgPersuasion : 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Debates
                  </p>

                  <p className="text-md text-slate-300">
                    {!userData ? 'N/A' : userFinalData.debateCount}
                  </p>
                </div>

              </div>

            </div>
          </div>

          <button
              onClick={
                ()=>navigate('/')
              }
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

          {leaderboard.length === 0 && (
            <div className="text-center mt-12">
              <p className="text-slate-500">
                No rankings available yet.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Leaderboard;