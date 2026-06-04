import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreateDebate from "./Component/CreateDebate";
import ChatDebate from "./Component/ChatDebate";
import DebateReport from "./Component/DebateReport";

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
          path="/report/:debateId"
          element={<DebateReport />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;