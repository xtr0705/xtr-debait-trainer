import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreateDebate from "./Pages/CreateDebate";
import ChatDebate from "./Pages/ChatDebate";
import DebateReport from "./Pages/DebateReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<CreateDebate />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/debate/:debateId"
          element={<ChatDebate />}
        />
        <Route
          path="/DebateReport/:debateId"
          element={<DebateReport />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;