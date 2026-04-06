import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubmitIdea from "./pages/SubmitIdea";
import Dashboard from "./pages/Dashboard";
import IdeaDetail from "./pages/IdeaDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubmitIdea />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ideas/:id" element={<IdeaDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
