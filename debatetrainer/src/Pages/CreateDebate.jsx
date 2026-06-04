import { useState } from "react";
import  supabase  from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function CreateDebate() {
  const [debateTopic, setDebateTopic] = useState("");
  const [debateMode, setDebateMode] = useState("professional");
  const [debateDuration, setDebateDuration] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createDebate = async () => {
    const object = await supabase.auth.getUser();
    const data = object.data.user;
    console.log(data);

    if (!debateTopic.trim()) {
      alert("Please enter a debate topic");
      return;
    }

    const response = await supabase
      .from("debates")
      .insert({
        topic: debateTopic,
        mode: debateMode,
        duration: debateDuration,
        user_id: data.id
      })
      .select("*")

    console.log(response);
    setLoading(true);
    if (response.error) {
      alert("Error create debate");
    } else {
      const debateId = response.data[0].id;
      navigate(`/debate/${debateId}`);
    }
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Creating Debate...</p>
      </div>
    );
  } else {

    return (
      <>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <input
            placeholder="Debate Topic"
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
            value={debateTopic}
            onChange={(e) => setDebateTopic(e.target.value)}
          />

          <select
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
            value={debateMode}
            onChange={(e) => setDebateMode(e.target.value)}
          >
            <option value="" disabled>
              Select Debate Mode
            </option>
            <option value="professional">Professional Debater</option>
            <option value="aggressive">Aggressive</option>
            <option value="job-interview">Job Interview</option>
            <option value="lawyer">
              Lawyer
            </option>
            <option value="philosopher">
              Philosopher
            </option>
            <option value="twitter-troll">
              Twitter Troll
            </option>
            <option value="devils-advocate">
              Devil's Advocate
            </option>
          </select>

          <select
            className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
            value={debateDuration}
            onChange={(e) => setDebateDuration(Number(e.target.value))}
          >
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
          </select>

          <button
            onClick={createDebate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Debate
          </button>
        </div>
      </>
    );
  }
}

export default CreateDebate;