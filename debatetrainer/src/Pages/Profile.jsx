
import { useState } from "react";
import supabase from "../lib/supabase";

function Profile() {
  const profileFinalInfo = {
    pfp: 'pfp',
    username: 'username',
    highest_score: 0,
    lowest_score: 0,
    highest_debate: 'highest_debate',
    lowest_debate: 'lowest_debate'
  }

  const userInfo = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log(user);

    if (user) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
      console.log(profile);

      const rawReportData = []
      const { data: reports } = await supabase
        .from('debate_reports')
        .select()
        .eq('user_id', user.id)
      console.log(reports);
      reports.forEach((report) => {
        rawReportData.push(report);
      })


      let overall = 0;
      let topDebate;
      for (let i = 0; i < rawReportData.length; i++) {
        if (overall < rawReportData[i].overall_score) {
          overall = rawReportData[i].overall_score;
          topDebate = rawReportData[i].topic;
        }
      }
      profileFinalInfo.highest_score = overall;
      console.log(overall);
      console.log(topDebate);
      
      


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


  return (


    <main className="min-h-screen bg-[#080808] text-white px-8 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <h1 className="text-5xl font-light tracking-widest">
            PROFILE
          </h1>
          <div className="mt-3 h-0.5 w-32 bg-copper-light"></div>
        </div>


        <section className="border border-white/10 bg-[#111111]">
          <div className="grid md:grid-cols-[180px_1fr]">


            <div className="border-r border-white/10 flex items-center justify-center p-8">
              <div className="w-36 h-36 border border-white/20 bg-[#181818] flex items-center justify-center text-white/40 text-sm hover:scale-105 transition">
                PFP
              </div>
            </div>


            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-4xl font-semibold">
                Salem Ali
              </h2>

              <p className="mt-2 text-white/60">
                Frontend Developer
              </p>

              <div className="mt-8 flex gap-10 text-sm uppercase tracking-wider">

                <div>
                  <p className="text-white/40">Debates</p>
                  <p className="text-3xl font-semibold mt-2">
                    27
                  </p>
                </div>

                <div>
                  <p className="text-white/40">Member Since</p>
                  <p className="text-3xl font-semibold mt-2">
                    Jun 2026
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>


        <section className="mt-14">

          <div className="mb-6">
            <h3 className="text-3xl font-light tracking-widest">
              PERFORMANCE
            </h3>

            <div className="mt-2 h-0.5 w-24 bg-copper-light"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">


            <div className="border border-white/10 bg-[#111111] p-8 hover:border-copper-light transition duration-300">

              <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                Highest Score
              </p>

              <h4 className="mt-8 text-2xl font-semibold leading-relaxed">
                AI WILL REPLACE
                <br />
                SOFTWARE ENGINEERS
              </h4>

              <div className="mt-10">

                <p className="text-white/40 uppercase text-xs">
                  Score
                </p>

                <h2 className="text-6xl font-bold mt-2 text-copper-light">
                  94
                </h2>

              </div>

              <button className="mt-10 border border-white/20 px-5 py-3 uppercase tracking-wider text-sm hover:border-copper-light hover:text-copper-light transition">
                View Report →
              </button>

            </div>


            <div className="border border-white/10 bg-[#111111] p-8 hover:border-copper-light transition duration-300">

              <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                Lowest Score
              </p>

              <h4 className="mt-8 text-2xl font-semibold leading-relaxed">
                SHOULD HOMEWORK
                <br />
                BE BANNED?
              </h4>

              <div className="mt-10">

                <p className="text-white/40 uppercase text-xs">
                  Score
                </p>

                <h2 className="text-6xl font-bold mt-2 text-copper-light">
                  51
                </h2>

              </div>

              <button className="mt-10 border border-white/20 px-5 py-3 uppercase tracking-wider text-sm hover:border-copper-light hover:text-copper-light transition">
                View Report →
              </button>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}



export default Profile;