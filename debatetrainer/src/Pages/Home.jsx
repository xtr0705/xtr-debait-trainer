import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";

function Home() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]">
      <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">

        <Navbar />

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">

          <div className="max-w-6xl">

            <p className="text-slate-500 uppercase tracking-widest mb-6">
              AI Debate Arena
            </p>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
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
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition"
              >
                Start A Debate
              </Link>

              <a
                href="#how-it-works"
                className="border border-slate-700 px-8 py-4 rounded-xl hover:bg-slate-900 transition"
              >
                Learn More
              </a>
            </div>

          </div>

        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>

        {/* Why */}
        <section className="max-w-6xl mx-auto px-6 py-24">

          <div className="max-w-3xl">

            <h2 className="text-4xl font-bold mb-6">
              Most Opinions Survive Because Nobody Questions Them.
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed">
              AI Debate Arena was built to do exactly that.
              Whether you're discussing technology, philosophy,
              business, ethics, or everyday ideas, the AI will challenge
              your assumptions, attack weak arguments, and force you
              to defend your position with better reasoning.
            </p>

            <p className="text-slate-300 text-lg mt-6">
              This isn't a chatbot.
            </p>

            <p className="text-white text-2xl font-semibold mt-2">
              It's an opponent.
            </p>

          </div>

        </section>

        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>

        {/* Opponents */}
        <section className="max-w-6xl mx-auto px-6 py-24">

          <h2 className="text-4xl font-bold mb-14">
            Choose Your Opponent
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="text-2xl font-semibold mb-4">
                Professional Debater
              </h3>

              <p className="text-slate-400">
                Calm. Structured. Evidence-driven.
                A logical opponent focused on reasoning,
                consistency, and clear argumentation.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="text-2xl font-semibold mb-4">
                Lawyer
              </h3>

              <p className="text-slate-400">
                Every statement becomes evidence.
                Every assumption gets cross-examined.
                Nothing passes without scrutiny.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="text-2xl font-semibold mb-4">
                Philosopher
              </h3>

              <p className="text-slate-400">
                Questions your assumptions.
                Challenges definitions.
                Forces deeper thinking behind every claim.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="text-2xl font-semibold mb-4">
                Devil's Advocate
              </h3>

              <p className="text-slate-400">
                Your strongest belief becomes the target.
                The AI's goal is to expose flaws in your
                reasoning from every possible angle.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="text-2xl font-semibold mb-4">
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

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="text-2xl font-semibold mb-4">
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

        {/* Process */}
        <section
          id="how-it-works"
          className="max-w-6xl mx-auto px-6 py-24"
        >

          <h2 className="text-4xl font-bold mb-14">
            What Happens During A Debate?
          </h2>

          <div className="space-y-8 text-xl">

            <p>You make a claim.</p>

            <p className="text-slate-400">
              The AI challenges the reasoning.
            </p>

            <p>You defend your position with evidence and logic.</p>

            <p className="text-slate-400">
              The AI finds another angle.
            </p>

            <p>You respond again.</p>

            <p className="text-slate-400">
              The cycle continues until the debate ends.
            </p>

          </div>

        </section>

        <div className="max-w-6xl mx-auto border-t border-slate-800"></div>

        {/* Reports */}
        <section className="max-w-6xl mx-auto px-6 py-24">

          <h2 className="text-4xl font-bold mb-12">
            When The Debate Ends
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="font-semibold text-lg mb-2">
                Persuasion Score
              </h3>

              <p className="text-slate-400">
                How convincing your arguments were.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="font-semibold text-lg mb-2">
                Logic Score
              </h3>

              <p className="text-slate-400">
                How consistent and rational your reasoning remained.
              </p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="font-semibold text-lg mb-2">
                Strongest Argument
              </h3>

              <p className="text-slate-400">
                The point that had the most impact.
              </p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="font-semibold text-lg mb-2">
                Weakest Argument
              </h3>

              <p className="text-slate-400">
                The argument most vulnerable to criticism.
              </p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
              <h3 className="font-semibold text-lg mb-2">
                Improvement Tip
              </h3>

              <p className="text-slate-400">
                Practical feedback to sharpen future debates.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
hover:bg-slate-900/80">
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

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-6 py-32 text-center">

          <h2 className="text-5xl font-bold mb-6">
            Ready To Put Your Ideas Under Pressure?
          </h2>

          <p className="text-slate-400 text-xl mb-10">
            The AI won't agree with you.
It won't make things easy.
And it won't let weak reasoning survive.

          </p>

          <Link
            to="/create-debate"
            className="inline-block bg-white text-black px-10 py-5 rounded-xl font-semibold hover:bg-slate-200 transition"
          >
            Start Your First Debate
          </Link>

        </section>

      </div>
    </div>
  );
}

export default Home;