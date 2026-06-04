import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreateDebate from "./Pages/CreateDebate";
import ChatDebate from "./Pages/ChatDebate";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;