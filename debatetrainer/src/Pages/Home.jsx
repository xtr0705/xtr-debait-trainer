import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

function Home() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_50%)]">
      <div className="relative min-h-screen bg-[#09090B] text-white overflow-hidden">

        <Navbar />
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">

          <div className="max-w-6xl">

            <p className="text-slate-500 uppercase tracking-widest mb-6">
              AI Debate Arena
            </p>

            <h1 className="text-6xl md:text-7xl leading-tight font-heading font-serif">
              Every Belief Sounds Right
              <br />
              Until It's Challenged.
            </h1>

            <p className="text-slate-400 text-xl mt-8 max-w-3xl leading-relaxed">
              Enter a debate against an AI opponent that refuses to back down.
              Test your reasoning, defend your position, and discover weaknesses
              in your arguments before someone else does.
            </p>

            <div className="flex gap-4 mt-10">
              <Link
  to="/create-debate"
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

  <span
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-transparent
      via-white/20
      to-transparent

      -translate-x-full
      group-hover:translate-x-full

      transition-transform
      duration-700
    "
  />

  <span className="relative">
    Start A Debate
  </span>

</Link>

              <a
                href="#how-it-works"
                className="
group
border
border-zinc-800
bg-zinc-900/50
backdrop-blur-sm

px-8
py-4

transition-all
duration-300

hover:border-violet-500/40
hover:bg-zinc-900
hover:-translate-y-0.5

hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]
"
              >
                Learn More
              </a>
              
            </div>

          </div>

        </section>

        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>

        <section className="max-w-6xl mx-auto px-6 py-24">

          <div className="max-w-3xl">

            <h2 className="text-4xl font-heading font-serif mb-6">
              Most Opinions Survive Because Nobody Questions Them.
            </h2>

            <p className="text-slate-400 text-lg font-heading leading-relaxed">
              AI Debate Arena was built to do exactly that.
              Whether you're discussing technology, philosophy,
              business, ethics, or everyday ideas, the AI will challenge
              your assumptions, attack weak arguments, and force you
              to defend your position with better reasoning.
            </p>

            <p className="text-slate-300 text-lg mt-6 font-semibold font-heading font-serif">
              This isn't a chatbot.
            </p>

            <p className="text-white text-2xl font-semibold font-serif mt-2">
              It's an opponent.
            </p>

          </div>

        </section>

        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>


        <section id="opponents" className="max-w-6xl mx-auto px-6 py-24">

          <h2 className="text-4xl mb-14 font-serif font-semibold">
            Choose Your Opponent
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-blue-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]
">

              <h3 className="text-2xl font-heading font-serif mb-4">
                Professional Debater
              </h3>

              <p className="text-slate-400">
                Calm. Structured. Evidence-driven.
                A logical opponent focused on reasoning,
                consistency, and clear argumentation.
              </p>
            </div>

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-emerald-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]
">
              <h3 className="text-2xl font-heading font-serif mb-4">
                Lawyer
              </h3>

              <p className="text-slate-400">
                Every statement becomes evidence.
                Every assumption gets cross-examined.
                Nothing passes without scrutiny.
              </p>
            </div>

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-violet-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
">
              <h3 className="text-2xl font-heading font-serif mb-4">
                Philosopher
              </h3>

              <p className="text-slate-400">
                Questions your assumptions.
                Challenges definitions.
                Forces deeper thinking behind every claim.
              </p>
            </div>

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-amber-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]
">
              <h3 className="text-2xl font-heading font-serif mb-4">
                Devil's Advocate
              </h3>

              <p className="text-slate-400">
                Your strongest belief becomes the target.
                The AI's goal is to expose flaws in your
                reasoning from every possible angle.
              </p>
            </div>
            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-cyan-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]
">
              <h3 className="text-2xl font-heading font-serif mb-4">
                Job Interviewer
              </h3>

              <p className="text-slate-400">
                Challenges your decisions, explores your
                thought process, and tests how well you
                can communicate under pressure.

                Not every answer is wrong.

                But every answer is examined.
              </p>
            </div>

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-orange-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(249,115,22,0.12)]
">
              <h3 className="text-2xl font-heading font-serif mb-4">
                Twitter troll
              </h3>

              <p className="text-slate-400">
                Dismisses weak arguments instantly.
                Uses mockery, one-liners, and internet-style
                counterarguments to challenge your position.
              </p>
            </div>

          </div>

        </section>

        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>

        
        <section
  id="how-it-works"
  className="max-w-6xl mx-auto px-6 py-32"
>

  <div className="grid lg:grid-cols-2 gap-16 items-center">

    <div className="relative">

      <div
        className="
          absolute
          inset-0
          bg-violet-500/10
          blur-3xl
          rounded-full
        "
      />

      <img
  src="/chat-preview.png"
  alt="AI Debate Arena Chat"
  className="
    relative
    rounded-2xl
    border
    border-slate-800
    shadow-2xl
    transition-all
    duration-500
    hover:scale-[1.01]
    hover:border-violet-500/30
  "
/>

    </div>


    <div>

      <p className="text-slate-500 uppercase tracking-widest mb-4">
        Real-Time Debate Experience
      </p>

      <h2 className="text-5xl  font-serif font-heading mb-8">
        Not Another AI Chatbot.
      </h2>

      <p className="text-slate-400 text-lg leading-relaxed mb-10">
        Every response is generated with full awareness of the conversation.
        The AI remembers previous arguments, challenges inconsistencies,
        and adapts its strategy throughout the debate.
      </p>

      <div className="space-y-8">

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Context-Aware Arguments
          </h3>

          <p className="text-slate-400">
            The AI remembers your previous claims and uses them against you.
            No repetitive responses. No isolated messages.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Multiple Debate Styles
          </h3>

          <p className="text-slate-400">
            Face a lawyer, philosopher, professional debater,
            job interviewer, aggressive responder, or even a Twitter troll.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">
            Instant Performance Analysis
          </h3>

          <p className="text-slate-400">
            Receive a detailed report with persuasion scores,
            logic ratings, strongest arguments, weaknesses,
            and actionable feedback.
          </p>
        </div>

      </div>

    </div>

  </div>

</section>

        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>

        <section className="max-w-6xl mx-auto px-6 py-24">

          <h2 className="text-4xl font-heading font-serif font-bold mb-12">
            When The Debate Ends
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-violet-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
">
  
              <h3 className="font-semibold text-lg mb-2">
                Persuasion Score
              </h3>

              <p className="text-slate-400">
                How convincing your arguments were.
              </p>
            </div>

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-violet-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
">
              <h3 className="font-semibold text-lg mb-2">
                Logic Score
              </h3>

              <p className="text-slate-400">
                How consistent and rational your reasoning remained.
              </p>
            </div>
            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-violet-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
">
              <h3 className="font-semibold text-lg mb-2">
                Strongest Argument
              </h3>

              <p className="text-slate-400">
                The point that had the most impact.
              </p>
            </div>
            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-violet-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
">
              <h3 className="font-semibold text-lg mb-2">
                Weakest Argument
              </h3>

              <p className="text-slate-400">
                The argument most vulnerable to criticism.
              </p>
            </div>
            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-violet-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
">
              <h3 className="font-semibold text-lg mb-2">
                Improvement Tip
              </h3>

              <p className="text-slate-400">
                Practical feedback to sharpen future debates.
              </p>
            </div>

            <div className="
group
relative
overflow-hidden
bg-gradient-to-br
from-zinc-900
to-black
border
border-zinc-800
rounded-2xl
p-8
transition-all
duration-300
hover:border-violet-500/40
hover:-translate-y-1
hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
">
              <h3 className="font-semibold text-lg mb-2">
                Winner
              </h3>

              <p className="text-slate-400">
                A final verdict on who made the stronger case.
              </p>
            </div>

          </div>

        </section>

        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>

        
        <section className="max-w-5xl mx-auto px-6 py-32 text-center">

          <h2 className="text-5xl font-heading font-serif mb-6">
            Ready To Put Your Ideas Under Pressure?
          </h2>

          <p className="text-slate-400 text-xl mb-10">
            The AI won't agree with you.
            It won't make things easy.
            And it won't let weak reasoning survive.

          </p>

         <Link
  to="/create-debate"
  className="
    group
    relative
    overflow-hidden
    bg-violet-500
    text-white
    px-10
    py-5
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
    left-0.5
    h-full
    w-[20%]

    bg-gradient-to-r
    from-transparent
    via-white/20
    to-transparent

    skew-x-12

    group-hover:left-50

    transition-all
    duration-300
  "
/>

  <span className="relative">
    Start Your First Debate
  </span>

</Link>

        </section>
        <Footer />

      </div>
    </div>
  );
}

export default Home;