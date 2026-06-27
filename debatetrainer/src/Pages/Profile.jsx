
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [pfp,setPfp]=useState('https://picsum.photos');
  const [username,setUsername]=useState('');
  const [profileFinalInfo, setProfileFinalInfo] = useState({
    highest_debate: '',
    lowest_debate: '',
    highest_overall: 0,
    lowest_overall: 0,
    pfp: 'img',
    username: 'abcd',
  });

  const handleImageChange = (e)=>{
    const files = e.target.files;
    if (files && files.length>0) {
      console.log(files);
      
      const localUrl = URL.createObjectURL(files[0]);
      setPfp(localUrl);
      console.log(localUrl);
      
    }
  }

  useEffect(() => {
    const userInfo = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      console.log(user);

      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
        console.log(profile);
        setUsername(profile[0].username);

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
        let leastDebate;
        let least = 0;

        for (let i = 0; i < rawReportData.length; i++) {
          if (overall < rawReportData[i].overall_score) {
            overall = rawReportData[i].overall_score;
            topDebate = rawReportData[i].topic;
          }
        }
        for (let i = 0; i < rawReportData.length; i++) {
          if (overall > rawReportData[i].overall_score) {
            least = rawReportData[i].overall_score;
            leastDebate = rawReportData[i].topic;
          }
        }


        const modelObject = {
          highest_debate: topDebate,
          lowest_debate: leastDebate,
          highest_overall: overall,
          lowest_overall: least,
          pfp:pfp,
          username:username
        };
        setProfileFinalInfo(modelObject)
        console.log(modelObject);


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

           
                 <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl max-w-xs mx-auto shadow-sm">
      {/* Clickable Image Container */}
      <label htmlFor="pfp-file-input" className="group relative cursor-pointer overflow-hidden rounded-full w-36 h-36 border-4 border-white shadow-md ring-2 ring-indigo-500/20 transition-all hover:ring-indigo-500">
        <img 
          src={pfp} 
          alt="Profile Preview" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        {/* Dark Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
          <span className="text-white text-xs font-medium tracking-wide">Change Photo</span>
        </div>
      </label>

      {/* Hidden File Input */}
      <input 
        type="file" 
        id="pfp-file-input" 
        accept="image/*" 
        className="hidden" 
        onChange={handleImageChange} 
      />
      
      
    </div>
              
            </div>


            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-4xl font-semibold">
                {username}
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
                Highest
              </p>

              <h4 className="mt-8 uppercase text-2xl font-semibold leading-relaxed">
                {profileFinalInfo.highest_debate}
              </h4>

              <div className="mt-10">

                <p className="text-white/40 uppercase text-xs">
                  Score
                </p>

                <h2 className="text-6xl font-bold mt-2 text-copper-light">
                  {profileFinalInfo.highest_overall}
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

              <h4 className="mt-8 uppercase text-2xl font-semibold leading-relaxed">
                {profileFinalInfo.lowest_debate}
              </h4>

              <div className="mt-10">

                <p className="text-white/40 uppercase text-xs">
                  Score
                </p>

                <h2 className="text-6xl font-bold mt-2 text-copper-light">
                  {profileFinalInfo.lowest_overall}
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