import { Route, Routes } from "react-router-dom";
import "./App.css";
import CodePage from "./pages/CodePage";
import { Toaster } from "react-hot-toast";
import Submissions from "./pages/Submissions";
function App() {
  return (
    <div className="sm:px-8 px-2">
      <Routes>
        <Route path="/" element={<CodePage />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
