
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Tap from "../Component/Tap";
import FadeInSection from "../Component/FadeInSection";
import CountUp from "react-countup";

function Profile() {
  const navigate = useNavigate();
  const [pfp, setPfp] = useState('/default-pfp.jpg');
  const [doc, setDoc] = useState('');
  const [username, setUsername] = useState('');
  const [profileFinalInfo, setProfileFinalInfo] = useState({
    highest_debate: '',
    lowest_debate: '',
    highest_overall: 0,
    lowest_overall: 0,
    pfp: pfp,
    username: username,
    doc: doc
  });



  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image.');
      return;
    }

    if (file.size > 2*1024*1024) {
      alert('Image must be smaller than 2 MB');
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const extension = file.name.split(".").pop();
    const fileName = `${user.id}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("pfp")
      .upload(fileName, file, {
        upsert: true,
      });

    if (uploadError) {
      console.log(uploadError);
      return;
    }
    const { data: { publicUrl } } = supabase.storage
      .from("pfp")
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('profiles')
      .update({
        pfp: publicUrl,
      })
      .eq('id', user.id);

    if (dbError) {
      console.log(dbError);
      return;
    }

    setPfp(publicUrl);
  }

  useEffect(() => {
    const userInfo = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)

        setUsername(profile[0].username);
        if (profile[0].pfp) {
          setPfp(profile[0].pfp);
        }
        const timestamp = profile[0].created_at;
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          month: "short",
          year: "2-digit",
        }).format(new Date(timestamp));

        setDoc(formattedDate);

        const rawReportData = []
        const { data: reports } = await supabase
          .from('debate_reports')
          .select()
          .eq('user_id', user.id)
          
        reports.forEach((report) => {
          rawReportData.push(report);
        })


        let overall = 0;
        let least = 0;
        let topDebate;
        let topDebateId;
        let leastDebate;
        let leastDebateId;

        for (let i = 0; i < rawReportData.length; i++) {
          if (overall < rawReportData[i].overall_score) {
            overall = rawReportData[i].overall_score;
            topDebate = rawReportData[i].topic;
            topDebateId = rawReportData[i].debate_id;
          }
        }
        for (let i = 0; i < rawReportData.length; i++) {
          if (overall > rawReportData[i].overall_score) {
            least = rawReportData[i].overall_score;
            leastDebate = rawReportData[i].topic;
            leastDebateId = rawReportData[i].debate_id;
          }
        }

        const modelObject = {
          highest_debate: topDebate,
          highest_debateId: topDebateId,
          lowest_debate: leastDebate,
          lowest_debateId: leastDebateId,
          highest_overall: overall,
          lowest_overall: least,
          pfp: pfp,
          username: username,
          doc: doc,
          debate_No: rawReportData.length
        };
        setProfileFinalInfo(modelObject)

        if (error) {
          console.log(error);
          return;
        }
      }
      if (error) {
        console.log(error);
        return;
      }

    }
    userInfo();
  }, [])


  return (


    <main className="min-h-screen bg-[#09090B] text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <div className="mb-14 text-center">

          <p className="uppercase tracking-[0.35em] text-slate-500 mb-4">
            DebateArena
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif">
            Your Profile
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2">
            Track your debate journey, revisit your strongest arguments,
            and measure your growth over time.
          </p>

        </div>

        <FadeInSection>
          <section className="bg-gradient-to-br
  from-zinc-900
  to-black

  border
  border-zinc-800

  shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <div className="grid md:grid-cols-[180px_1fr]">


              <div className="
  border-b
  md:border-b-0
  md:border-r
  border-zinc-800

  flex
  items-center
  justify-center

  p-6
  sm:p-8
  ">


                <div className="flex flex-col items-center justify-center p-6  max-w-xs mx-auto shadow-sm">
                  <label htmlFor="pfp-file-input" className="group relative cursor-pointer overflow-hidden
  border-violet-500/30 w-32 h-32 sm:w-40 sm:h-40 shadow-md ring-1 ring-black transition-all hover:ring-indigo-500">
                    <img
                      src={pfp}
                      alt="Profile Preview"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <span className="hidden sm:block text-white text-xs font-medium tracking-wide">Change Photo</span>
                    </div>
                  </label>


                  <input
                    type="file"
                    id="pfp-file-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />


                </div>

              </div>


              <div className="p-6 sm:p-8 flex flex-col justify-center text-center md:text-left">

                <p className="uppercase tracking-[0.25em] text-xs mb-4 text-zinc-500">
                  USERNAME
                </p>

                <h2 className="text-3xl sm:text-5xl font-serif">
                  {username}
                </h2>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

                  <div className="border border-zinc-800 bg-black/40 p-5">

                    <p className="uppercase tracking-[0.25em] text-xs text-zinc-500">
                      Debates
                    </p>

                    <h3 className="text-3xl sm:text-4xl font-bold mt-4 text-violet-400">
                      <CountUp
                      end={profileFinalInfo.debate_No}
                      duration={1.2}
                     />
                    </h3>

                  </div>

                  <div className="border border-zinc-800 bg-black/40 p-5">

                    <p className="uppercase tracking-[0.25em] text-xs text-zinc-500">
                      Joined
                    </p>

                    <h3 className="text-lg sm:text-2xl font-semibold mt-5">
                      {doc}
                    </h3>

                  </div>

                </div>
              </div>

            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section className="mt-14">

            <div className="mb-6">
              <h3 className="text-3xl font-serif sm:text-4xl">
                PERFORMANCE
              </h3>

              <div className="mt-2 h-0.5 w-24 bg-violet-500"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">


              <div className="bg-gradient-to-br
  from-zinc-900
  to-black

  border
  border-zinc-800

  p-6 sm:p-8 
  flex
  flex-col
  hover:border-violet-500/40

  transition-all
  duration-300">

                <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                  Best Performance
                </p>

                <h4 className="mt-10 uppercase text-lg sm:text-2xl font-semibold leading-relaxed min-h-[72px] sm:h-24">
                  {profileFinalInfo.highest_debate}
                </h4>

                <div className="mt-10">

                  <p className="text-white/40 uppercase text-xs">
                    Score
                  </p>

                  <h2 className="text-5xl sm:text-6xl font-bold mt-2 text-violet-400">
                     <CountUp
                      end={profileFinalInfo.highest_overall}
                      duration={1.2}
                      />
                    
                  </h2>

                </div>
                <Tap>
                  <button className="mt-10 bg-violet-500
    text-white w-full sm:w-fit shadow-sm py-3 px-3 uppercase tracking-wider text-sm hover:bg-violet-400
    hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
    transition"
                    onClick={
                      () => navigate(`/DebateReport/${profileFinalInfo.highest_debateId}`)
                    }
                  >
                    View Report →
                  </button>
                </Tap>

              </div>


              <div className="bg-gradient-to-br
  from-zinc-900
  to-black

  flex
  flex-col
  border
  border-zinc-800
  hover:border-violet-500/40

  shadow-[0_0_40px_rgba(139,92,246,0.05)] p-6 sm:p-8 hover:border-copper-light transition duration-300">

                <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                  Needs Improvement
                </p>

                <h4 className="mt-8 uppercase text-lg sm:text-2xl font-semibold leading-relaxed min-h-[72px] sm:h-24">
                  {profileFinalInfo.lowest_debate}
                </h4>

                <div className="mt-10">

                  <p className="text-white/40 uppercase text-xs">
                    Score
                  </p>

                  <h2 className="text-5xl sm:text-6xl font-bold mt-2 text-violet-400">
                    <CountUp
                      end={profileFinalInfo.lowest_overall}
                      duration={1.2}
                      />
                  </h2>

                </div>
                <Tap>
                  <button className="mt-10 bg-violet-500
    text-white w-full sm:w-fit px-3 py-3 uppercase tracking-wider text-sm hover:bg-violet-400
    hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]
    transition"
                    onClick={
                      () => navigate(`/DebateReport/${profileFinalInfo.lowest_debateId}`)
                    }
                  >
                    View Report →
                  </button>
                </Tap>

              </div>

            </div>

          </section>
        </FadeInSection>

      </div>
    </main>
  );
}



export default Profile;